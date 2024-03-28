import { usePublicStore } from '@/store/modules/public';
import { IDict } from '@/store/types/index';

export default () => {
    const publicStore = usePublicStore();
    function dataSourceTypeFilter(str: string) {
        let array: IDict[] = [];
        publicStore.dictList.data_source_type
            ? (() => {
                  array = publicStore.dictList.data_source_type.filter(
                      (item: dictInfo) => item.dictCode === str,
                  );
              })()
            : '';
        const string = array[0] ? array[0].dictValue : '未知类型';
        return string;
    }
    const dataTargetDbNameFilter = (str: string) => {
        const item = publicStore.dictList.data_target_db_name.find(
            (item: dictInfo) => item.dictCode === str,
        );
        return item ? item.dictValue : '未知数据库名';
    };
    const dataTargetTableNameFilter = (dbName: string, val: string) => {
        const params = 'data_target_db_table_' + dbName;
        const dictList: dictInfo[] =
            publicStore.dictList[params] ||
            publicStore.dictList['data_target_db_table_other'];

        const item = dictList
            .filter((item) => item)
            .find((item) => item.dictCode === val);
        return item ? item.dictValue : '未知表名';
    };
    const dataDbTypeFilter = (str: string) => {
        const item = publicStore.dictList.data_db_type.find(
            (item: dictInfo) => item.dictCode === str,
        );
        return item ? item.dictValue : '未知类型';
    };
    const logLevelFilter = (str: string) => {
        let array: IDict[] = [];
        publicStore.dictList.dop_log_level
            ? (() => {
                  array = publicStore.dictList.dop_log_level.filter(
                      (item: dictInfo) => item.dictCode == str,
                  );
              })()
            : '';
        const string = array[0] ? array[0].dictValue : '未知级别';
        return string;
    };
    return {
        dataSourceTypeFilter,
        dataTargetDbNameFilter,
        dataDbTypeFilter,
        dataTargetTableNameFilter,
        logLevelFilter,
    };
};
