
$(document).on('rex:ready',function(event, container) {
    $(container).find("[class*='redactorEditor2-']").each(function() {
        profile = $(this).attr('class').substring('redactorEditor2-'.length);
        $(this).redactor(redactor2_profiles[profile]);
    })
});