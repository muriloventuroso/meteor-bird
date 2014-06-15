moment.lang('pt-br', {
    months : "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
    monthsShort : "jan._fev._mar_abr._mai_jun_jul._ago_set._out._nov._dez.".split("_"),
    weekdays : "domingo_segunda_terça_quarta_quinta_sexta_sábado".split("_"),
    weekdaysShort : "dom._seg._ter._qua._qui._sex._sab.".split("_"),
    weekdaysMin : "Do_Se_Te_Qa_Qi_Sx_Sa".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[Aujourd'hui à] LT",
        nextDay: '[Demain à] LT',
        nextWeek: 'dddd [à] LT',
        lastDay: '[Hier à] LT',
        lastWeek: 'dddd [dernier à] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "em %s",
        past : "%s atrás",
        s : "segundos",
        m : "um minuto",
        mm : "%d minutos",
        h : "uma hora",
        hh : "%d horas",
        d : "um dia",
        dd : "%d dias",
        M : "um mês",
        MM : "%d meses",
        y : "um ano",
        yy : "%d anos"
    },
    ordinal : function (number) {
        return number + (number === 1 ? 'er' : 'ème');
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
Handlebars.registerHelper('formatarData', function(data){
	return moment(data).fromNow();
});