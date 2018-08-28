# coding=utf-8
"""
synopsis: utils
author: haoranzeus@gmail.com (zhanghaoran)
"""
import logging
import random
import requests


from flask import Flask
from flask_restful import Api

from mysqldal import sql_engine
from mysqldal.models import Room, Roles
from utils.context import Context


app = Flask(__name__)
api = Api(app)
context = Context()
_log = logging.getLogger(__name__)


ROLE_MAP = {
    'townsfolk': '平民',
    'werewolf': '狼人',
    'seer': '预言家',
    'witch': '女巫',
    'hunter': '猎人',
    'guard': '守卫',
    'idiot': '白痴',
    'whitewerewolf': '白狼王',
}


def openid_get(appid, secret, js_code):
    url = (
        'https://api.weixin.qq.com/sns/jscode2session?appid='
        '{appid}&secret={secret}&js_code={js_code}'
        '&grant_type=authorization_code'
    ).format(appid=appid, secret=secret, js_code=js_code)
    res = requests.get(url)
    return res.json()['openid']


def create_room(condition_dict):
    """
    创建房间
    返回加入码
    """
    room_get = None
    openid = condition_dict['openid']
    nickname = condition_dict['nick_name']
    roles = condition_dict['roles']
    return_val = {}
    role_list = []
    for k, v in roles.items():
        for i in range(0, v):
            role_list.append(k)
    with sql_engine.session_scope() as session:
        q_res = session.query(Room).filter(Room.owner_openid == openid)
        room_get = q_res.one_or_none()
        if room_get is not None:
            room_get.code = '{:0>6d}'.format(random.randint(0, 999999))
            room_get.owner_nickname = nickname
            return_val = {'room_num': room_get.id, 'join_code': room_get.code}
            for role_get in room_get.roles:
                role_get.enabled = 0
                role_get.player_openid = ''
            for i in range(0, len(role_list)):
                room_get.roles[i].enabled = 1
                room_get.roles[i].role_name = role_list[i]
    if room_get is not None:
        return return_val
    else:
        # 首次创建
        room_dict = {
            'code': '{:0>6d}'.format(random.randint(0, 999999)),
            'owner_openid': openid,
            'owner_nickname': nickname
        }
        room = Room(**room_dict)
        # 添加三十个空角色
        for i in range(0, 30):
            if i < len(role_list):
                room.roles.append(Roles(
                    enabled=1, role_name=role_list[i], player_openid=''))
            else:
                room.roles.append(Roles(role_name='待定', player_openid=''))
        with sql_engine.session_scope() as session:
            session.add(room)
        with sql_engine.session_scope() as session:
            q_res = session.query(Room).filter(Room.owner_openid == openid)
            room = q_res.one()
            room_num = room.id
            join_code = room.code
            print(room_num, join_code)
            return {'room_num': room_num, 'join_code': join_code}


def join_room(condition_dict):
    print(condition_dict)
    room_id = condition_dict['room_num']
    join_code = condition_dict['join_code']
    nickname = condition_dict['nick_name']
    openid = condition_dict['openid']
    role_get = None
    with sql_engine.session_scope() as session:
        room = session.query(Room).filter(Room.id == room_id).\
            filter(Room.code == join_code).one_or_none()
        if room is None:
            return {'role': '房间号或加入码错误'}

    with sql_engine.session_scope() as session:
        role_get = session.query(Roles).filter(Roles.room_id == room_id).\
            filter(Roles.player_openid == openid).one_or_none()
        if role_get is not None:
            return {'role': ROLE_MAP[role_get.role_name]}
    # 随机抽取
    with sql_engine.session_scope() as session:
        roles_get = session.query(Roles).filter(Roles.room_id == room_id).\
            filter(Roles.player_openid == '').filter(Roles.enabled == 1).all()
        index = random.randint(0, len(roles_get))
        roles_get[index].player_openid = openid
        roles_get[index].player_nickname = nickname
        return {'role': ROLE_MAP[roles_get[index].role_name]}
