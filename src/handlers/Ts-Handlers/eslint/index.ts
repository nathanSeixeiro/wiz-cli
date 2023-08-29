import { GluegunToolbox } from "gluegun";
import { AbstractHandle } from "../../abstract";
import { ITsCommand } from "../../../interfaces";

export class EslintHandle extends AbstractHandle {
    constructor(private toolbox: GluegunToolbox){
        super()
    }

    public async handle(request: ITsCommand):Promise<void> {
        const {name, eslint} = request

        if(eslint){
            await this.toolbox.template.generate({
                template: 'Ts-Templates/eslint/.eslintignore.ejs',
                target: `${name}/.eslintinore`
            })

            await this.toolbox.template.generate({
                template: 'Ts-Templates/eslint/.eslintrc.js.ejs',
                target: `${name}/.eslintrc.js`
            })

            return super.handle(request)
        }
        return super.handle(request)
    }
}