import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [question, setQuestion] = useState([])
  
  //GET
  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then((question) => setQuestion(question))
  }, [])

  //DELETE
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then(response => response.json())
    .then(() => {
      const updatedQuestions = question.filter((q) => q.id !== id)
      setQuestion(updatedQuestions)
    })
  }

  //UPDATE
  const handleUpdate = (id, body) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({body})
    })
    .then(response => response.json())
    .then((newQuestion) => {
      const updatedQuestion = question.map((q) => {
        if (q.id === newQuestion.id) {
          return newQuestion;
        }
        return q;
      })
      setQuestion(updatedQuestion)
    })
  }

   const displayQuestions = question.map((q) => (
     <QuestionItem
       key={q.id}
       question={q}
       handleDelete={handleDelete}
       onChangeAnswer={handleUpdate}
     />
   ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {displayQuestions}
      </ul>
    </section>
  );
}

export default QuestionList;
