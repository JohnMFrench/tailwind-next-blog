import { createReadStream } from 'fs'
import Papa from 'papaparse'
import siteMetadata from '@/data/siteMetadata'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'
import SocialIcon from '@/components/social-icons'
import { useEffect, useState } from 'react'

/* SET A COMPONENT LEVEL STATE THAT WILL TRACK WHETHER THE CARDS IS FLIPPED FROM Q OR A */
let cardShowingQ: boolean
cardShowingQ = true

type QandA = Array<Array<string>>

export async function getServerSideProps({ req, res }) {
  console.log('GETTING SERVER SIDE PROPS')
  //let file = fs.createReadStream('./../data/na-interview-prep.csv')
  try {
    //let file = fs.createReadStream('./addresses.csv');
    //console.log(file.path)
    let parse_result = Papa.parse(PREP_CSV, {
      complete: function (results) {
        console.log("completed parse");
        console.log(results);
      },
    })
  } catch (e) {
    console.log(e)
  }

  return {
    props: {},
  }
}

export default function FlashCards({}) {
  //const [qs_and_as, setCards] = useState<Array<Array<string>>>([[]])

  /* CHANGE THE STYLE OF THE CARD AFTER IT IS FLIPPED */
  function toggleCard() {
    cardShowingQ
      ? (document.getElementById('flash-card').classList.remove('border-rust'),
        document.getElementById('flash-card').classList.add('border-opal'))
      : (document.getElementById('flash-card').classList.add('border-rust'),
        document.getElementById('flash-card').classList.remove('border-opal'))
    cardShowingQ = !cardShowingQ
  }

  return (
    <>
      <PageSEO
        title={`FlashCards - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className="mb-8 divide-y divide-gray-200 p-6">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Data Analytics Interview Prep
          </h1>
          <h2 className="text-2xl font-bold">Interactive flash cards</h2>
        </div>
        {/* LOAD THE FLASH CARDS DYNAMICALLY */}
        <div>
          <div
            id="flash-card"
            onClick={toggleCard}
            className="m-auto h-80 w-10/12 border-2 border-rust text-center align-middle text-xl hover:cursor-pointer  md:h-64 md:border-4 md:text-2xl"
          >
            <p id="flash-card-q">What is the purpose of a database schema?</p>
          </div>
        </div>
      </div>
    </>
  )
}

const PREP_CSV = `
Question Statement,Expected Response (or Resource Link),Difficulty,,
What is the purpose of a database schema?,"It provides the description and design of the database. This may include how the data is actually stored, how the data is logically arranged, and how the users interact with the data.",Easy,,"NOTE:  SQL code can vary slightly by DBMS or application.  As long as the student is close, I recommend some credit."
Is there a difference between the value NULL and the value 0 or an empty string? Explain.,"Yes. The NULL value is when a field has no defined value, whereas the 0 or empty string value are defined values. 0 is the number 0 and the empty string is a string with no characters. While you can use comparison operators (=, >, etc) on 0 and the empty string, you cannot with NULL. You would need to use the IS or IS NOT NULL commands.",Easy,,
"Your workplace uses long table names. You'd like to shorten the table names when writing your queries, so that queries are easier to read. How would you go about this?","Create an alias using ""As"" . For example, SELECT tblEmployeeEvaluations AS Eval.",Easy,,
What is the difference between a table and a view,"A table is the stored collection of related data stored in rows and columns; A view is essentially a display of data from one or more tables which is created on the fly by SQL. For example, the employee table has all attributes of each employee whereas a view called ""Employee Preview"" may show only a subset of the columns for each employee and may also include related data from other tables.",Easy,,
Which SQL command would you used to remove data from a table?,DELETE - More completely DELETE FROM TableX WHERE Condition_is _met;,Medium,,
You need to store some SQL inside the database so you can use it over and over. What would you use to accomplish this?,Stored Procedure - the key here is storing the SQL within the DB system instead of writing it outside the system.,Medium,,
"Building on the previous question, what could you use to run this code automatically in response to various events?","A trigger. The distinction between a stored procedure and a trigger is that the stored procedure can be called by the user whereas the trigger is automatic in response to an event. Also, a stored procedure can return data and a trigger is not able to return values.",Hard,,
For what is the foreign key used?,A foreign key is a reference to the primary key of another table which can be used to link tables together.,Easy,,
You need to know how many students in the Students table has the last_name 'Smith'. How could you go about this?,The best answer since you simply need a count is to use the COUNT command: SELECT COUNT(*) FROM Students WHERE last_name = 'Smith'; Although running the same query without the count command will yield all of the rows and you could count them or the DBMS will likely tell you how many rows were returned.,Medium,,
"The Employees table has a column called ""JobTitle"". Your company is changing all of the employees with the current title of ""Programmer"" to ""Developer"" and your boss has asked you to update all of the titles in the database. How would you achieve this?",UPDATE Employees SET JobTitle = 'Developer' WHERE JobTitle= 'Programmer';,Medium,,
You would like to create a query which essentially stacks your two tables on top of one another. Kind of like combining 2 documents by pasting the contents of document 2 at the bottom of document 1. What type of JOIN would accomplish this?,UNION or UNION ALL,Medium,,
You would like to query 2 tables and return only the combined attributes of the rows which have matching values in particular columns. Which type of JOIN would you use?,An INNER JOIN would combine only those rows in which the particular attributes match.,Medium,,
For what would you use the LIMIT or TOP command?,"To limit the number of rows returned by a query. For example, SELECT * FROM TableName LIMIT 100 would return the top 100 rows.",Medium,,
Your company is outsourcing employee benefits to another company and you no longer need a table called Employee_Benefits in the company database. What command would you used to remove this table from the database?,"DROP TABLE Employee_Benefits; - The previous command is a complete answer, but as an interviewer I would love to hear an awareness that 1) someone has authorized this to happen and 2) that the data was backed up and archived prior. Also, that we first verified there are no dependencies on this table.",Medium,,
"Your company is beginning to hire interns and would like you to create a new table called Interns in the database and include a name column called FullName, the numerical department code for the department they work in, and their email address . What is the command to do this?","This may vary slightly, but something similar to: CREATE TABLE Interns (FullName VARCHAR(100), DeptCode INT NOT NULL, Email VARCHAR(100));",Hard,,
You've been assigned as the DBA for a database which contains sensitive customer information. What are some steps you can take to protect the data?,"Set up access controls and auditing to reduce the number of people with access and to be able to view what is being accessed and by whom. You would also want to encrypt the data. In Oracle, you could use Transparent Data Encryption feature.",Medium,,
Which command can be used to ensure the query returns values in ascending order based on the age attribute?,ORDER BY age ASC,,,
Your boss wants a list of all of the cities where employees live in from the Employees table. She wants each city listed only once. How could you accomplish this?,SELECT DISTINCT City FROM Employees;,Easy,,
"Your boss also wants a query which she can run anytime to check how many difference cities the employees live in. Since she will be running this query herself, she doesn't want to have to manually count the rows. How could you achieve this?",SELECT COUNT(DISTINCT City) FROM Employees;,Medium,,
Oracle has some built-in roles. Which role would we grant to a database superuser?,DBA role which contains all system privileges,Medium,,
How does Oracle protect users from issues such as seeing unfinished edits or two people changing the data at the same time?,Oracle implements isolation and locking for transactions. Isolation prevents users from seeing uncommited changes. Locking prevents other users from making changes to data which is currently being edited be someone else,Medium,,
`;