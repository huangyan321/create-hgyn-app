import { defineStore } from 'pinia';
interface ITableWidths {
    [key: string]: Array<{ property: string; width: number }>;
}
export const useTableWidthStore = defineStore({
    id: 'tableWidth',
    state: () => ({
        tableWidths: {} as ITableWidths,
    }),
    actions: {
        setColumnWidth(routeName: string, property: string, width: number) {
            const tableWidth = this.tableWidths[routeName] ?? [];
            const index = tableWidth.findIndex(
                (item) => item.property === property,
            );
            if (index > -1) tableWidth[index].width = width;
            else tableWidth.push({ property, width });
            this.tableWidths[routeName] = tableWidth;
        },
        getColumnWidth(routeName: string, property: string) {
            const tableWidth = this.tableWidths[routeName] ?? [];
            const index = tableWidth.findIndex(
                (item) => item.property === property,
            );
            return index > -1 ? tableWidth[index].width : null;
        },
    },
    persist: {
        enabled: true,
        strategies: [{ key: 'WELNESS-TABLE-WIDTH', storage: localStorage }],
    },
});
