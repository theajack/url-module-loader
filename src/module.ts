/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-19 14:15:48
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-19 18:25:40
 */
export class Module {
    name: string;
    value: string;
    dependencies: string[];
    url: string;
    loader: (...modules: Module[])=>any;

    module: any;

    constructor (name: string, value: string) {
        this.name = name;
        this.value = value;
    }
}