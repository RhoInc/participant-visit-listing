import { saveAs } from './exportToXLSX/FileSaver';

export default function exportToXLSX() {
	function clone(obj) {
		let copy;

		//boolean, number, string, null, undefined
		if ('object' != typeof obj || null == obj)
			return obj;

		//date
		if (obj instanceof Date) {
			copy = new Date();
			copy.setTime(obj.getTime());
			return copy;
		}

		//array
		if (obj instanceof Array) {
			copy = [];
			for (var i = 0, len = obj.length; i < len; i++) {
				copy[i] = clone(obj[i]);
			}
			return copy;
		}

		//object
		if (obj instanceof Object) {
			copy = {};
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr))
					copy[attr] = clone(obj[attr]);
			}
			return copy;
		}

		throw new Error('Unable to copy [obj]! Its type is not supported.');
	}

  //Convert XLSX file for download.
    function s2ab(s) {
        let i;
        if (typeof ArrayBuffer !== 'undefined') {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);

            for (i = 0; i !== s.length; ++i)
                view[i] = s.charCodeAt(i) & 0xFF;

            return buf;
        } else {
            var buf = new Array(s.length);

            for (i = 0; i !== s.length; ++i)
                buf[i] = s.charCodeAt(i) & 0xFF;

            return buf;
        }
    }

  //Define generic workbook object.
    function workBook() {
        this.SheetNames = [];
        this.Sheets = {};
    }

  //Update range when defining cells.
    function updateRange(range, row, col) {
        if (range.s.r > row) range.s.r = row;
        if (range.s.c > col) range.s.c = col;
        if (range.e.r < row) range.e.r = row;
        if (range.e.c < col) range.e.c = col;
    }

  //Define cell.
    function addCell(wb, ws, value, type, styles, range, row, col) {
        updateRange(range, row, col);
        styles.fill.fgColor.rgb = row > 0 && row%2 ? 'FFffffff' : styles.fill.fgColor.rgb; 
        const
            cell = {v: value, t: type, s: styles},
            cell_ref = XLSX.utils.encode_cell({c: col, r:row});
        ws[cell_ref] = cell;
    }

  //Export data to XLSX.
    function defineXLSX(listing) {
        const name = 'Participant Visit Listing';
        const headerStyle = {
            font: {
                bold: true
            },
            fill: {
                fgColor: {rgb: 'FFcccccc'}
            },
            alignment: {
                wrapText: true
            }
        };
        const bodyStyle = {
            font: {
                sz: 10
            },
            fill: {
                fgColor: {rgb: 'FFeeeeee'}
            },
            alignment: {
                wrapText: true
            }
        };
        const wb = new workBook();
        const ws = {};
        const cols = [];
        const range = {s: {c:10000000, r:10000000}, e:{c:0, r:0}};
        const defaultCellStyle =  {
            font: {
                name: 'Verdana',
                sz: 11,
                color: 'FF00FF88'
            },
            fill: {
                fgColor:
                    {rgb: 'FFFFAA00'}
            }
        };
        const wbOptions = {
            bookType: 'xlsx',
            bookSST: true,
            type: 'binary',
        };

        const filterRange = 'A1:' + String.fromCharCode(64 + listing.config.cols.length) + (listing.data.filtered.length + 1);

        //Header row
        listing.config.headers.forEach((header,col) => {
            addCell(wb,ws,header,'c',clone(headerStyle),range,0,col);
        });

        //Data rows
        listing.data.filtered.forEach((d,row) => {
            listing.config.cols.forEach((variable,col) => {
                addCell(wb,ws,d[variable] || '','c',clone(bodyStyle),range,row + 1,col);
            });
        });
        console.log(ws);

        //Define column widths.
        const tr = listing.tbody
            .selectAll('tr')
            //.filter(function() {
            //    return d3.select(this).style('display') === 'table-row'; })
            .filter((d,i) => i === 0);
        tr
            .selectAll('td')
            .each(function(d,i) {
                cols.push({wpx: i > 0 ? this.offsetWidth - 20 : 175});
            });

        ws['!ref'] = XLSX.utils.encode_range(range);
        ws['!cols'] = cols;
        ws['!autofilter'] = {ref: filterRange};
        //ws['!freeze'] = { xSplit: '1', ySplit: '1', topLeftCell: 'B2', activePane: 'bottomRight', state: 'frozen' };

        wb.SheetNames.push(name);
        wb.Sheets[name] = ws;

        listing.XLSX = XLSX.write(wb, wbOptions);
    }

    function exportXLSX(listing) {
            try {
                saveAs
                    (new Blob
                        (   [s2ab(listing.XLSX)]
                        ,   {type:'application/octet-stream'}
                        )
                    ,'participant-visit-listing.xlsx'
                    );
            } catch(error) {
                if (typeof console != 'undefined')
                    console.log(error);
            }
    }

    //this.wrap.select('.export#xlsx')
    //    .on('click', () => {
            defineXLSX(this);
            exportXLSX(this);
    //    });
}
