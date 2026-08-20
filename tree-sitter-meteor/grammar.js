module.exports = grammar({
    name: "meteor",

    extras: $ => [
        /\s/,
        $.comment
    ],

    rules: {
        source_file: $ => repeat($._statement),

        _statement: $ => choice(
            $.write_statement,
            $.exec_statement
        ),

        write_statement: $ => seq(
            "write",
            "(",
            $.string,
            optional(seq(
                ",",
                $.boolean
            )),
            ")",
            ";"
        ),

        exec_statement: $ => seq(
            "exec",
            "(",
            $.string,
            ")",
            ";"
        ),

        string: $ =>
            /"([^"\\]|\\.)*"/,

        boolean: $ =>
            choice(
                "true",
                "false"
            ),

        comment: $ =>
            token(seq(
                "//",
                /.*/
            ))
    }
});
