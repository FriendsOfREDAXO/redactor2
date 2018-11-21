
$(document).on('rex:ready',function(event, container) {
    $(container).find("[class*='redactorEditor2-']").each(function() {
        profile = $(this).attr('class').substring('redactorEditor2-'.length);
        classnames = $(this).attr('class').split(" ");
        for (i = 0; i < classnames.length; i++) {
            profile = classnames[i].substring('redactorEditor2-'.length);
            if (profile != "" && redactor2_profiles[profile]) {
                $(this).redactor(redactor2_profiles[profile]);
            }
        }
    })
});