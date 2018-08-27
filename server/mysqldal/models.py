# coding=utf-8
"""
synopsis: sqlalchemy models
author: haoranzeus@gmail.com (zhanghaoran)
"""
from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Room(Base):
    __tablename__ = 'room'
    id = Column(Integer, primary_key=True)
    code = Column(String(200), doc='加入码')
    owner_openid = Column(String(200), doc='房间创建者openid')
    owner_nickname = Column(String(200), doc='创建者昵称')

    roles = relationship('Roles', order_by='Roles.id', back_populates='room')


class Roles(Base):
    __tablename__ = 'roles'
    id = Column(Integer, primary_key=True)
    role_name = Column(String(200), default='平民', doc='角色名称')
    enabled = Column(Integer, default=0, doc='是否使用(0否,1是)')
    player_openid = Column(String(200), doc='玩家openid')
    player_nickname = Column(String(200), doc='玩家昵称')
    room_id = Column(
            Integer,
            ForeignKey('room.id', onupdate='RESTRICT', ondelete='RESTRICT'),
            nullable=False)
    room = relationship('Room', back_populates='roles')
