from pandas.core.arrays import ExtensionArray

from pandas._typing import type_t

class ExtensionDtype:
    def __eq__(self, other) -> bool: ...
    def __hash__(self) -> int: ...
    def __ne__(self, other) -> bool: ...
    @property
    def na_value(self): ...
    @property
    def type(self) -> type_t: ...
    @property
    def kind(self) -> str: ...
    @property
    def name(self) -> str: ...
    @property
    def names(self) -> list[str] | None: ...
    @classmethod
    def construct_array_type(cls) -> type_t[ExtensionArray]: ...
    @classmethod
    def construct_from_string(cls, string: str): ...
    @classmethod
    def is_dtype(cls, dtype) -> bool: ...
