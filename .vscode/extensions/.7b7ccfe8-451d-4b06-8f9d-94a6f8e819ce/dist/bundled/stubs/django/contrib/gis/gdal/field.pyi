from typing import Any

from django.contrib.gis.gdal.base import GDALBase as GDALBase

class Field(GDALBase):
    ptr: Any = ...
    __class__: Any = ...
    def __init__(self, feat: Any, index: Any) -> None: ...
    def as_double(self): ...
    def as_int(self, is_64: bool = ...): ...
    def as_string(self): ...
    def as_datetime(self): ...
    @property
    def is_set(self): ...
    @property
    def name(self): ...
    @property
    def precision(self): ...
    @property
    def type(self): ...
    @property
    def type_name(self): ...
    @property
    def value(self): ...
    @property
    def width(self): ...

class OFTInteger(Field):
    @property
    def value(self): ...
    @property
    def type(self): ...

class OFTReal(Field):
    @property
    def value(self): ...

class OFTString(Field): ...
class OFTWideString(Field): ...
class OFTBinary(Field): ...

class OFTDate(Field):
    @property
    def value(self): ...

class OFTDateTime(Field):
    @property
    def value(self): ...

class OFTTime(Field):
    @property
    def value(self): ...

class OFTInteger64(OFTInteger): ...
class OFTIntegerList(Field): ...
class OFTRealList(Field): ...
class OFTStringList(Field): ...
class OFTWideStringList(Field): ...
class OFTInteger64List(Field): ...

OGRFieldTypes: Any
ROGRFieldTypes: Any
