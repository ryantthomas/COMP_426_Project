let songData = [];
$.getJSON("https://tastedive.com/api/similar?{query}={value}&k=348775-GroupPro-QFR7GQLZ", function(data) {
    songData = data;
})

