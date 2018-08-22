# coding=utf-8
"""
synopsis: sqlalchemy engine and session
author: haoranzeus@gmail.com (zhanghaoran)
"""
import logging
from contextlib import contextmanager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from utils.context import Context
context = Context()
_log = logging.getLogger(__name__)


def sql_init():
    db_conf = context.conf_dict['woodenwerewolf']['cmdb_database']
    sql_alchemy_para = (
        'mysql+pymysql://{usr}:{pwd}@{host}:{port}/{schema}?charset={charset}'
    ).format(
            usr=db_conf['user'], pwd=db_conf['password'], host=db_conf['host'],
            port=3306, schema=db_conf['database'], charset=db_conf['charset']
    )
    context.engine = create_engine(
            sql_alchemy_para, pool_recycle=5, echo=False)
    context.Session = sessionmaker(bind=context.engine)
    _log.debug('**sql init complete**')


@contextmanager
def session_scope():
    session = context.Session()
    try:
        yield session
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()
