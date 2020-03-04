export class OutField {
    constructor(
        public key: string,
        public outKey?: string,
        public convert?: (v: any) => any
    ) {
        if(outKey == null) this.outKey = key;
    }
}

export class Widget {
    _widget: string;
    _outFields: OutField[] = [];

    constructor(widgetName?: string, outFields: (OutField | string)[] = []) {
        this._widget = widgetName;
        this.addFields(outFields);
    }

    addFields(fields: (OutField | string)[]) {
        this._outFields.push(...fields.map(v => {
            if(typeof v == "string") return new OutField(v);
            return v;
        }))
    }

    toJson() {
        const map: {[key: string] : any} = {};
        if(this._widget != null) {
            map['type'] = this._widget;
        }
        this._outFields.forEach(field => {
            let val = (this as any)[field.key];
            if(typeof val === 'undefined' || val === null) return;
            if(typeof val === "object" && 'toJson' in val && typeof val['toJson'] == 'function') {
                val = val['toJson']();
            }
            if(typeof val === "object" && Array.isArray(val)){
                val = val.map((v) => {
                    if(typeof v === "object" && 'toJson' in v && typeof v['toJson'] == 'function') {
                        return v['toJson']();
                    }
                    return v;
                });
            }
            if(field.convert) {
                val = field.convert(val);
            }
            map[field.outKey] = val;
        });
        return map;
    }
}
