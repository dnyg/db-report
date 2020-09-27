type Nullable<T> = T | null;

export interface ColumnDataRow {
    TABLE_CATALOG: string;
    TABLE_SCHEMA: string;
    TABLE_NAME: string;
    COLUMN_NAME: string;
    ORDINAL_POSITION: number;
    COLUMN_DEFAULT: Nullable<string>;
    IS_NULLABLE: 'NO'|'YES';
    DATA_TYPE: 'int'|'varchar'|string;
    CHARACTER_MAXIMUM_LENGTH: Nullable<number>;
    CHARACTER_OCTET_LENGTH: Nullable<number>;
    NUMERIC_PRECISION: Nullable<number>;
    NUMERIC_SCALE: Nullable<number>;
    DATETIME_PRECISION: Nullable<number>;
    CHARACTER_SET_NAME: Nullable<string>;
    COLLATION_NAME: Nullable<string>;
    COLUMN_TYPE: 'int unsigned'|string;
    COLUMN_KEY: Nullable<string>;
    EXTRA: Nullable<string>;
    PRIVILEGES: Nullable<string>
    COLUMN_COMMENT: Nullable<string>
    GENERATION_EXPRESSION: Nullable<string>; 
    SRS_ID: Nullable<number>;
}
