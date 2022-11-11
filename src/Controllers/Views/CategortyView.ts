import { HStack, VStack, cTopLeading, ForEach, cLeading, Icon, Text, Color, CornerRadiusTypes, cTop, bindState, cVertical, ScrollView } from '@tuval/forms';
import { int } from '@tuval/core';


const broker_cats = [
    {
        title: 'Explore',
        subItems: [
            {
                title: 'All Categories'
            },
            {
                title: 'Featured'
            },
            {
                title: 'New Brokers'
            },
            {
                title: "Editor's Choice"
            }


        ]
    },
    {
        title: 'Browse by Category',
        subItems: [
            {
                title: 'Database'
            },
            {
                title: 'CRM'
            },
            {
                title: 'Marketing'
            },
            {
                title: 'Project Management'
            },
            {
                title: "Software Development"
            },
            {
                title: 'Team Management'
            },
            {
                title: 'Productivity & Efficiency'
            },
            {
                title: 'Integrations'
            },
            {
                title: "Collaboration"
            },
            {
                title: 'Reporting & Analytics'
            },
            {
                title: 'Import & Export'
            },
            {
                title: "Build In Integrations"
            }


        ]
    }
]

export function CategoryListView(appsCategoryModel: any) {
    const [selectedIndex, setSelectedIndex] = bindState(-1);
    return ({ OnCategorySelected }) => {
        return (
            ScrollView({ axes: cVertical, alignment: cTopLeading })(
                VStack({ alignment: cTopLeading })(
                    ...ForEach(broker_cats)(cat =>
                        VStack({ alignment: cTopLeading })(
                            Text(cat.title).foregroundColor('#323338').fontSize(18).fontWeight('500').marginLeft('10px').marginBottom('12px').marginTop('20px'),
                            ...ForEach(cat.subItems)(subItem =>
                                HStack({ alignment: cLeading })(
                                    Text(subItem.title).foregroundColor('#323338').fontSize(16).fontWeight('400').lineHeight(32)
                                        .fontFamily(" Manrope,Roboto,Rubik,Noto Kufi Arabic,Noto Sans JP,sans-serif"),
                                )
                                    .height(40)
                                    .cursor('pointer')
                                    .background({ hover: '#e6e9ef' }).height().cornerRadius(5).padding(5).paddingLeft('10px')
                            )
                        ),

                    )

                ).height().padding('10px')
            ).width(300)


        )
    }
}