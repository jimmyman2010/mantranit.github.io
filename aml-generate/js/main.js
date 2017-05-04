/**
 * Created by MinhMan.Tran on 5/3/2017.
 */

$(function(){
    var source = $('#source');
    $('#one-column').on('click', function(){
        $.get('templates/moduleContentOne.html', function(result){
            source.append(result);
        });
    });

    $('#two-columns').on('click', function(){
        $.get('templates/moduleContentTwo.html', function(result){
            source.append(result);
        });
    });

    source.on('click', '.add-content', function(){
        var that = $(this),
            papa = that.parent();

        $('#modalContent').modal('show');
    });

    $('select[name="selectContentType"]').on('change', function(){
        if($(this).val() === 'expansion'){
            $('#modalContent .show-expansion').show();
            $('#modalContent .show-no-expansion').hide();
        } else {
            $('#modalContent .show-expansion').hide();
            $('#modalContent .show-no-expansion').show();
        }
    });

    $('#offerAndJoin').summernote({
        minHeight: 300
    });

    $('#hotelHighlight').summernote({
        minHeight: 300
    });

    $('#termAndConditions').summernote({
        minHeight: 300
    });

});