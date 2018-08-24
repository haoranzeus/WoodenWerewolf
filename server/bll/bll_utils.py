# coding=utf-8
"""
synopsis: utils
author: haoranzeus@gmail.com (zhanghaoran)
"""
import logging
import requests


from flask import Flask
from flask_restful import Api

from utils.context import Context


app = Flask(__name__)
api = Api(app)
context = Context()
_log = logging.getLogger(__name__)


def openid_get(appid, secret, js_code):
    url = (
        'https://api.weixin.qq.com/sns/jscode2session?appid='
        '{appid}&secret={secret}&js_code={js_code}'
        '&grant_type=authorization_code'
    ).format(appid=appid, secret=secret, js_code=js_code)
    res = requests.get(url)
    return res.json()['openid']
