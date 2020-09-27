let inputs = $('input[type="text"], textarea');
inputs.each(function (i, input) {
    $(input).on('input', function (e) {
        if ($(input).val().length == 1) {
            $(input).val($(input).val().toString().toUpperCase());
        }
    })
})

$("input[type='submit']").click(function (e) {
    e.preventDefault();
    let check = document.getElementById('formRai').reportValidity();
    if (check) {
        var pleaseWait = $('#pleaseWaitDialog');

        showPleaseWait = function () { pleaseWait.modal('show'); };

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