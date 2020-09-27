function doPost(e) {
    try {
        saveSpread(e);
        return ContentService
            .createTextOutput(JSON.stringify({ "result": "success" }))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ "result": "error", "error": e }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

function saveSpread(e) {
    var params = e;

    var sps = SpreadsheetApp.openById('16lq4tWtIAUFMmwhzhOe-Zqc_BDsUBMyJKlAziFSzCBw');
    var sheetN = sps.getSheets().length;
    var sheetPL = sps.getSheetByName('PL');
    var copy = sheetPL.copyTo(sps).setName('RAI-' + sheetN);

    var title = params.parameter.title;
    var author = params.parameter.author;
    var year = params.parameter.year;
    var theme = params.parameter.theme;
    var editorial = params.parameter.editorial;
    var isbn = params.parameter.isbn;
    var site = params.parameter.site;
    var summary = params.parameter.summary;
    var index = params.parameter.index;
    var keyWords = params.parameter.keyWords;
    var conclusion = params.parameter.conclusion;
    var date = params.parameter.date;

    copy.getRange('F16:G16').setValue('RAI No. ' + sheetN);

    // Modify consultation date
    var newDate = new Date();
    copy.getRange('G20').setValue(date != '' ? date : '=DATE(' + newDate.getFullYear() + ';' + (newDate.getMonth() + 1) + ';' + newDate.getDate() + ')');

    // Modify header sheet
    copy.getRange('C18').setValue(title);
    copy.getRange('E18:G18').setValue(author);
    copy.getRange('E19').setValue(year);
    copy.getRange('E20').setValue(theme);
    copy.getRange('C19').setValue(editorial);
    copy.getRange('G19').setValue(isbn);
    copy.getRange('C20').setFormula('=HYPERLINK("' + site + '"; "Sitio web")');

    // Modify summary
    copy.getRange('B22:G46').setValue(summary);

    // Modify index general
    for (var i in index) {
        copy.getRange('B' + (60 + +i) + ':G' + (60 + +i)).setValue(index[i]);
    }

    // Modify keywords
    copy.getRange('B70:G70').setValue(keyWords);

    // Modify conclusion
    copy.getRange('B75:G79').setValue(conclusion);
}