--
-- Ope Database
--

create schema if not exists ope;


create table ope.exam (
    examId text not null primary key,
    name   text not null
);


create table ope.exam_question (
    questionId text  not null primary key,
    examId     text  not null references ope.exam(examId),
    index      int   not null,
    type       text  not null,
    data       jsonb not null
);


create table ope.test (
    testId   text not null primary key,
    examId   text not null references ope.exam(examId),
    student  text,
    started  int,
    finished int
);


create table ope.test_answer (
    answerId   text not null primary key,
    questionId text not null references ope.exam_question(questionId),
    index      int  not null,
    started    int,
    finished   int,
    answer     text
);
