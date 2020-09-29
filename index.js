let inputs = $('input[type="text"], textarea');
inputs.each(function (i, input) {
    $(input).on('input', function (e) {
        if ($(input).val().length == 1) {
            $(input).val($(input).val().toString().toUpperCase());
        }
    })
})

$('.select').each(function (i, selectDiv) {
    let btnAdd = $(selectDiv).find('.btnAdd');
    let btnDelete = $(selectDiv).find('.btnDelete');
    let btnEdit = $(selectDiv).find('.btnEdit');
    let select = $(selectDiv).find('select');

    let valueItemF = function (option) {
        let value = $('#addItem #valueModalAdd').val();
        if (value && !option) {
            $(select).append(`<option>${value}</option>`)
        } else if (option) {
            $(select).find(':selected').text(value);
            $('#addItem').modal('hide');
        }
        $('#message').html(`<div class="alert alert-info"><button type="button" class="close close-alert" data-dismiss="alert" aria-hidden="true">×</button>New item has been ${option ? 'edited' : 'added'}.</div>`);
        setTimeout(() => {
            $(".alert").alert('close');
        }, 2000);
        $('#addItem #valueModalAdd').val('');
    }
    let optionClick = function (option = false) {
        $('#addItem').modal();
        $('#addItem #valueModalAdd').val(option ? $(select).find(':selected').val() : '');
        $('#addItem #titleModalAdd').text(`NEW ${i == 0 ? "INDEX" : "KEY WORD"}`);
        $('#addItem #labelModalAdd').text(`Add new ${i == 0 ? "index" : "key word"}`);
        $('#addItem #btnOtherAdd').text(option ? 'Edit item' : this.text);
        $('#addItem #valueModalAdd').off().on('keydown', function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                valueItemF(option);
            }
        });
        $('#addItem #btnOtherAdd').off().click(function () {
            valueItemF(option);
        });
    }
    btnAdd.click(function () {
        optionClick();
    });

    $(btnEdit).click(function () {
        optionClick(true);
    });

    $(select).change(function (e) {
        let position = $(select).find(':selected').index();
        if (position != 0) {
            $(btnDelete).removeAttr('disabled');
            $(btnEdit).removeAttr('disabled');
        }
        else {
            $(btnDelete).attr('disabled', 'disabled');
            $(btnEdit).attr('disabled', 'disabled');
        }
        $(btnEdit).css('display', position != 0 ? 'block' : 'none');
    });

    $(btnDelete).click(function () {
        let position = $(select).find(':selected').index();
        let confirmResponse = confirm('Do you want to remove it?');
        if (confirmResponse) {
            $(select).children()[position].remove()
            $(btnDelete).attr('disabled', 'disabled');
            $(btnEdit).attr('disabled', 'disabled');
            $(btnEdit).css('display', 'none');
        }
    });
});

$("input[type='submit']").click(function (e) {
    e.preventDefault();
    let check = document.getElementById('formRai').reportValidity();
    if (check) {
        var pleaseWait = $('#pleaseWaitDialog');
        showPleaseWait = function () {
            let modal = pleaseWait.modal('show');
            $(modal).find('#progress').width('40%')
            $(modal).find('#progress').removeClass('bg-success')
        };
        hidePleaseWait = function () { pleaseWait.modal('hide'); };
        showPleaseWait();

        let url = 'https://script.google.com/macros/s/AKfycby0OfAgmNdhTlux-IAJkwoPRLBqsY3PCwtVO4sWxw/exec';
        let data = {};

        data.title = document.getElementById('title').value;
        data.author = document.getElementById('author').value;
        data.year = document.getElementById('year').value;
        data.theme = document.getElementById('theme').value;
        data.editorial = document.getElementById('editorial').value;
        data.isbn = document.getElementById('isbn').value;
        data.site = document.getElementById('site').value;
        data.date = document.getElementById('date').value;
        data.summary = document.getElementById('summary').value;
        data.conclusion = document.getElementById('conclusion').value;

        let progress = $('#progress');

        let indexTxt = '';
        for (let i = 1; i < $('#selectIndex').children().length; i++) {
            indexTxt += $('#selectIndex').children()[i].text + "|";
        }

        let keyTxt = '';
        for (let i = 1; i < $('#selectKey').children().length; i++) {
            keyTxt += $('#selectKey').children()[i].text + ",";
        }

        data.index = indexTxt;
        data.keyWords = keyTxt;

        $.ajax({
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "POST",
            dataType: "json",
            data: data,
            success: function () {
                $(progress).width('100%')
                $(progress).addClass('bg-success')
                $(pleaseWait).find('#header-modal').text('RAI SENT');
                $(pleaseWait).find('#p-moda').text('Your RAI has been saved in your drive.');
                setTimeout(() => {
                    hidePleaseWait();
                    window.open(window.location.href, '_self');
                }, 3000);
            },
            error: function (e) {
                $(progress).width('100%')
                $(progress).addClass('bg-danger')
                $(pleaseWait).find('#header-modal').text('ERROR WHEND SEND IT');
                $(pleaseWait).find('#p-moda').text('Your RAI has not been sending correctly, try again.');
                hidePleaseWait();
                console.log("Error: " + e);
            }
        });

    }
});