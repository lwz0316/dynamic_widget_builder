import {Align} from "../src/widget/basic/align";
import {Text} from "../src/widget/basic/text";
import {Alignment, FontStyle, FontWeight} from "../src/types";
import {Container} from "../src/widget/basic/container";
import {BoxConstraints} from "../src/widget/property/box_constraints";
import {EdgeInsets} from "../src/widget/property/edgeInsets_param";
import {TextStyle} from "../src/widget/property/type_style";
import {Color} from "../src/widget/property/color";
import {Stack} from "../src/widget/basic/stack";
import {Column} from "../src/widget/basic/column";
import {Row} from "../src/widget/basic/row";

const test = Stack({
    children: [
        Align({
            alignment: Alignment.center,
            child: Column({
                children: [
                    Container({
                        constraints: BoxConstraints({
                            minHeight: 200,
                            maxHeight: 500
                        }),
                        padding: EdgeInsets.symmetric({vertical: 8, horizontal: 16}),
                        child: Text('hello world', {
                            style: TextStyle({
                                color: Color(0xff123456),
                                fontWeight: FontWeight.bold,
                                fontStyle: FontStyle.italic,
                            }),
                        }),
                    }),
                  Row({
                      children: [
                          Text('hello world'),
                          Text('hello world')
                      ]
                  })
                ]
            }),
        }),
    ]
});

console.log(JSON.stringify(test.toJson(), null, 2));
