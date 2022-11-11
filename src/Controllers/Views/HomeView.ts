import { cHorizontal, cLeading, Color, cTopLeading, HStack, Text, UIImage, VStack } from "@tuval/forms";
import { Theme } from "../../Theme";



const MainPanel = () => (
    VStack(
        Text('Gelen kutusu')
    )
    .cornerRadius(8)
        .marginTop('16px')
        .background(Theme.SecondaryBackgroundColor)
        .shadow('0px 3px 12px var(--box-shadow-color)')
        .variable('--box-shadow-color', { default: 'var(--application-border-color)' })
)

export const HomeView = () => (
    VStack({ alignment: cTopLeading })(
        HStack({ alignment: cLeading })(
            Text('Hos geldiniz.').fontWeight('500').fontSize(18).marginLeft('32px')
                .marginRight('12px').fontFamily('Manrope,Roboto,Rubik,Noto Kufi Arabic,Noto Sans JP,sans-serif'),
            UIImage('/static/assets/home_title_image.svg')
        ).background(Theme.ApplicationBackgroundColor),
        HStack(
            MainPanel()
        ).padding(cHorizontal, 80)
    ).height(88).shadow('0px 3px 12px  #e6e9ef').zIndex(1)
)