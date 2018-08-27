# coding=utf-8
"""
synopsis: flask app.
author: haoranzeus@gmail.com (zhanghaoran)
"""
import logging
import os
from flask import Flask
from flask import request
from flask_cors import CORS
from flask_restful import Api, Resource

from bll import bll_utils
from utils.context import Context


app = Flask(__name__)
api = Api(app)
context = Context()
_log = logging.getLogger(__name__)


class Hello(Resource):
    def get(self):
        print(request)
        print(dir(request))
        print(request.url_root)
        print(context.conf_dict['woodenwerewolf']['url_root'])
        return {'hello': 'name'}


class OnLogin(Resource):
    """
    参数：code: 小程序获取的code，用于换取openid
    获取openid
    """
    def post(self):
        js_code = request.json['code']
        openid = bll_utils.openid_get(context.appid, context.secret, js_code)
        print(openid)
        return {'openid': openid}


class CreateRoom(Resource):
    """
    condition_dict: {
        "openid": "xxx",
        "nick_name": "xxx",
        "roles": {
            "townsfolk": 4,
            "werewolf: 4,
            "seer":1,
            "witch": 1,
            "hunter": 1,
            "guard": 1,
            "idiot": 1
        }
    }
    """
    def post(self):
        return bll_utils.create_room(request.json)


class JoinRoom(Resource):
    def post(self):
        return bll_utils.join_room(request.json)


def app_init(log_conf_dict):
    """
    flask app 初始化
    """
    CORS(app, supports_credentials=True)    # 允许所有跨域

    # 集中设置路由
    url_base = context.conf_dict['woodenwerewolf']['url_root']
    routers = [
        (Hello, 'hello/'),
        (OnLogin, 'onlogin/'),
        (CreateRoom, 'createroom/'),
        (JoinRoom, 'joinroom/'),
    ]

    # 路由注册
    for handle, url in routers:
        api.add_resource(handle, os.path.join(url_base, url))

    # 将logging.yaml中定义的handler加入到flask的log
    filename = log_conf_dict['handlers']['rotatingFile']['filename']
    maxBytes = log_conf_dict['handlers']['rotatingFile']['maxBytes']
    backupCount = log_conf_dict['handlers']['rotatingFile']['backupCount']
    level = log_conf_dict['handlers']['rotatingFile']['level']
    level_dict = {
        'INFO': logging.INFO,
        'DEBUG': logging.DEBUG,
        'WARNING': logging.WARNING,
        'ERROR': logging.ERROR,
        'CRITICAL': logging.CRITICAL
    }
    handler = logging.handlers.RotatingFileHandler(
            filename, maxBytes=maxBytes, backupCount=backupCount)
    handler.setLevel(level_dict[level])
    app.logger.addHandler(handler)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
