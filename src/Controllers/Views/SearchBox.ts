import { HStack, Icon, TextField } from '@tuval/forms';
export function searchBox(): any {
    return ({ onSearchTextChanged }) => {
        return (
            HStack(
                HStack(
                    Icon('\\d22c')
                        .size(12)
                        .paddingRight('10px')
                        .paddingLeft('10px')
                        .foregroundColor('#7C7C7C'),
                    TextField().fontSize('14px')
                        .backgroundColor('transparent')
                        .foregroundColor('#495057')
                        .padding('0.25rem 0.25rem 0.25rem 0rem')
                        .placeholder('Search')
                        .onTextChange((text) => { setTimeout(() => onSearchTextChanged(text), 100) })
                )
                    .width()
                    .backgroundColor('#DBDBDB')
                    .initial({ width: '85%', backgroundColor: 'rgba(255,255,255,0.3)' }).focus({ width: '90%', backgroundColor: 'rgba(255,255,255,0.6)' })
                    .overflow('hidden')
                    .cornerRadius(5)
                    //.border({ default: '1px solid #ced4da', focus: 'solid 1px #6366F1' })
                    .shadow({ default: '', focus: '0 0 0 0.2rem #c7d2fe' })
                    //.transition('background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s')
                    //.backgroundColor('rgba(255,255,255,0.3)')
                    .height()
                    .tabIndex(0)
            ).height()
        )
    }

}