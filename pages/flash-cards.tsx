import { createReadStream } from 'fs'
import Papa from 'papaparse'
import siteMetadata from '@/data/siteMetadata'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'
import SocialIcon from '@/components/social-icons'
import { useEffect, useState } from 'react'

/* SET A COMPONENT LEVEL STATE THAT WILL TRACK WHETHER THE CARDS IS FLIPPED FROM Q OR A */
const cardShowingQ = true
const cards: Array<Question> = []

type Question = {
  question: string
  response: string
  difficulty: string
  topic: string
}

export async function getStaticProps({ req, res }) {
  console.log('GETTING SERVER SIDE PROPS')
  //let file = fs.createReadStream('./../data/na-interview-prep.csv')
  try {
    //let file = fs.createReadStream('./addresses.csv');
    //console.log(file.path)
    const parse_result = Papa.parse(PREP_CSV_REWORKED, {
      complete: function (results) {
        console.log('parsed data of ')
        console.log(results.data.length)
        results.data.forEach((line: string, i: number) => {
          //console.log(line.length);
          //console.log(line);
          if (i != 0) {
            if (line[0] == '' && line[1] == '') {
              console.log(`line ${i} is returning null`)
            }
            //can't think of a more clever way to avoid entering header row
            const c: Question = {
              question: line[0],
              response: line[1] || '',
              difficulty: line[2] || '',
              topic: line[3] || '',
            }
            cards.push(c)
          }
        })
      },
    })
  } catch (e) {
    console.log(e)
  }

  return {
    props: {
      cards: cards,
    },
  }
}

export default function FlashCards(props) {
  const [activeCard, setActiveCard] = useState(props.cards[1])
  const [qShowing, setQShowing] = useState(true)

  /* CHANGE THE STYLE OF THE CARD AFTER IT IS FLIPPED */
  function toggleCard() {
    qShowing
      ? (document.getElementById('flash-card').classList.remove('border-rust'),
        document.getElementById('flash-card').classList.add('border-opal'))
      : (document.getElementById('flash-card').classList.add('border-rust'),
        document.getElementById('flash-card').classList.remove('border-opal'))
    setQShowing(!qShowing)
  }

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
  }

  function newQuestion() {
    const i = getRandomInt(0, props.cards.length)
    setQShowing(true)
    setActiveCard(props.cards[i])
  }

  return (
    <>
      <PageSEO
        title={`FlashCards - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        {/* PAGE TITLE */}
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Data Analytics Interview Prep
        </h1>
        <h2 className="text-2xl font-bold">Interactive flash cards</h2>
      </div>
      <div className="container min-h-full">
        <div className="flex">
          {/* New Question Button */}
          <button
            className="text-l text-bold m-2 mb-2 rounded-md border-4 border-rust p-2 md:text-xl"
            onClick={newQuestion}
            onKeyDown={newQuestion}
            role="switch"
          >
            New Question →
          </button>
          {/* Difficulty Label */}
          <label className="text-bold ml-2 mb-2 border-2 border-opal p-2">
            {activeCard.difficulty}
          </label>
          {/* Topic Label */}
          <label className="text-bold ml-2 mb-2 border-2 border-opal p-2">{activeCard.topic}</label>
        </div>
        {/* Flash Card */}
        <div
          id="flash-card"
          onClick={toggleCard}
          onKeyDown={toggleCard}
          role="button"
          tabIndex={0}
          className="m-4 flex max-h-full w-10/12 items-center border-4 border-rust pt-24 pb-24 text-center align-baseline text-xl hover:cursor-pointer md:min-h-fit md:border-4 md:text-2xl"
        >
          <p id="flash-card-q" className="pl-2 pr-2">
            {qShowing ? activeCard.question : activeCard.response}
          </p>
        </div>
      </div>
    </>
  )
}

const PREP_CSV_REWORKED = `Is there a difference between the value NULL and the value 0 or an empty string? Explain.,"Yes. The NULL value is when a field has no defined value, whereas the 0 or empty string value are defined values. 0 is the number 0 and the empty string is a string with no characters. While you can use comparison operators (=, >, etc) on 0 and the empty string, you cannot with NULL. You would need to use the IS or IS NOT NULL commands.",Easy,SQL/Database
"Your workplace uses long table names. You'd like to shorten the table names when writing your queries, so that queries are easier to read. How would you go about this?","Create an alias using ""As"" . For example, SELECT tblEmployeeEvaluations AS Eval.",Easy,SQL/Database
What is the difference between a table and a view,"A table is the stored collection of related data stored in rows and columns; A view is essentially a display of data from one or more tables which is created on the fly by SQL. For example, the employee table has all attributes of each employee whereas a view called ""Employee Preview"" may show only a subset of the columns for each employee and may also include related data from other tables.",Easy,SQL/Database
Which SQL command would you used to remove data from a table?,DELETE - More completely DELETE FROM TableX WHERE Condition_is _met;,Medium,SQL/Database
You need to store some SQL inside the database so you can use it over and over. What would you use to accomplish this?,Stored Procedure - the key here is storing the SQL within the DB system instead of writing it outside the system.,Medium,SQL/Database
"Building on the previous question, what could you use to run this code automatically in response to various events?","A trigger. The distinction between a stored procedure and a trigger is that the stored procedure can be called by the user whereas the trigger is automatic in response to an event. Also, a stored procedure can return data and a trigger is not able to return values.",Hard,SQL/Database
For what is the foreign key used?,A foreign key is a reference to the primary key of another table which can be used to link tables together.,Easy,SQL/Database
You need to know how many students in the Students table has the last_name 'Smith'. How could you go about this?,The best answer since you simply need a count is to use the COUNT command: SELECT COUNT(*) FROM Students WHERE last_name = 'Smith'; Although running the same query without the count command will yield all of the rows and you could count them or the DBMS will likely tell you how many rows were returned.,Medium,SQL/Database
"The Employees table has a column called ""JobTitle"". Your company is changing all of the employees with the current title of ""Programmer"" to ""Developer"" and your boss has asked you to update all of the titles in the database. How would you achieve this?",UPDATE Employees SET JobTitle = 'Developer' WHERE JobTitle= 'Programmer';,Medium,SQL/Database
You would like to create a query which essentially stacks your two tables on top of one another. Kind of like combining 3 documents by pasting the contents of document 2 at the bottom of document 1. What type of JOIN would accomplish this?,UNION or UNION ALL,Medium,SQL/Database
You would like to query 2 tables and return only the combined attributes of the rows which have matching values in particular columns. Which type of JOIN would you use?,An INNER JOIN would combine only those rows in which the particular attributes match.,Medium,SQL/Database
For what would you use the LIMIT or TOP command?,"To limit the number of rows returned by a query. For example, SELECT * FROM TableName LIMIT 100 would return the top 100 rows.",Medium,SQL/Database
Your company is outsourcing employee benefits to another company and you no longer need a table called Employee_Benefits in the company database. What command would you used to remove this table from the database?,"DROP TABLE Employee_Benefits; - The previous command is a complete answer, but as an interviewer I would love to hear an awareness that 1) someone has authorized this to happen and 2) that the data was backed up and archived prior. Also, that we first verified there are no dependencies on this table.",Medium,SQL/Database
"Your company is beginning to hire interns and would like you to create a new table called Interns in the database and include a name column called FullName, the numerical department code for the department they work in, and their email address . What is the command to do this?","This may vary slightly, but something similar to: CREATE TABLE Interns (FullName VARCHAR(100), DeptCode INT NOT NULL, Email VARCHAR(100));",Hard,SQL/Database
You've been assigned as the DBA for a database which contains sensitive customer information. What are some steps you can take to protect the data?,"Set up access controls and auditing to reduce the number of people with access and to be able to view what is being accessed and by whom. You would also want to encrypt the data. In Oracle, you could use Transparent Data Encryption feature.",Medium,SQL/Database
Which command can be used to ensure the query returns values in ascending order based on the age attribute?,ORDER BY age ASC,Easy,SQL/Database
Your boss wants a list of all of the cities where employees live in from the Employees table. She wants each city listed only once. How could you accomplish this?,SELECT DISTINCT City FROM Employees;,Easy,SQL/Database
"Your boss also wants a query which she can run anytime to check how many difference cities the employees live in. Since she will be running this query herself, she doesn't want to have to manually count the rows. How could you achieve this?",SELECT COUNT(DISTINCT City) FROM Employees;,Medium,SQL/Database
Oracle has some built-in roles. Which role would we grant to a database superuser?,DBA role which contains all system privileges,Medium,SQL/Database
How does Oracle protect users from issues such as seeing unfinished edits or two people changing the data at the same time?,Oracle implements isolation and locking for transactions. Isolation prevents users from seeing uncommited changes. Locking prevents other users from making changes to data which is currently being edited be someone else,Medium,SQL/Database
What are the steps you would take to debug your python application?,"There are many possible answers for this question.  This can involve running python interactively, adding unit tests to the scripts (unittest, pytest, doctest, etc.), built-in debugger extension on their chosen IDE, etc, or even printing the output to the screen as you are developing. Can even use pychecker or pylint to make sure the code is following best practices.",Medium,Python
Describe what the difference between a tuple and a list in python.,"Tuples are immutable, meaning the data stored within is not able to be changed. It can be referenced, modified, and saved as another object.  Much like ""Save As"" when saving a read-only document with a different name as the original. Lists are mutable.",Medium,Python
Explain how you would create a dictionary in python. How would you amend other entries to it?,"dict = {'Sarah':'IT','John':'HR','Mary':'Marketing'}
The dictionary above maps Sarah to the IT department, John to HR, and Mary to Marketing.
dict.Update({'Susan':'Engineer'})
Adds a new entry to the existing dictionary.",Hard,Python
What is the name of the python package manager?,pip,Easy,Python
How do you close an IF statement?,Start a new line with the same indentation as where the IF began. Python uses indentation to identify the scope of code.,Easy,Python
How do you include comments in a python script?,"Docstrings are commonly used to add attributes to a module, class, etc. But they are also commonly used to add comments to code. Docstrings have three quote symbols at the opening and closing of comments, which could either be one line, or multiple lines.
Another way to comment a line is to precede any line with a hash (#) symbol.",Easy,Python
Explain how you would create a list in python.,"Surround the list with brackets, separating each object with commas. For example, colors = [""blue"",""green"",""red""]",Medium,Python
"What is the term ""casting"" mean in python, and describe an example of when you would use it.","Python assumes data types based on the object's characteristics. But sometimes we need the object to be a different data type. We can force an integer to be a string, for example, to prevent calculations on the object. (Example: A = int(string)) 
",Medium,Python
"You have a list variable named ""numbers"" which include a list of 1, 2, 3, 4. How would you remove the number 3 using the ""pop"" method?","numbers.pop(2)
The built-in ""pop"" method removes an item from a list, and accepts an index argument, which starts at zero.",Medium,Python
"You create a global variable in a module, but you would also like to use that variable in another module you are writing. How do you make that variable usable in your second module? ","Create a new config module and add the desired variable into the module. Then within the other modules, you can import the variables from the config module.",Hard,Python
How would you define a decorator?,Basically a decorator is a function that is passed as an argument to another function.,Easy,Python
Which string method would you use to force all characters to be lowercase?,lower(),Easy,Python
Which string method would you use to find how many characters are in a string?,len(),Easy,Python
"Which class from the datetime module would you use to find the difference between two points in time? For example, if you wanted to capture how long it takes for a runner to run two miles.",datetime.timedelta,Medium,Python
How did you create a function in python?,def statement,Easy,Python
"You need to round a number to the nearest whole number of equal or greater vaule. Which function would be best to use? For example, you want it to round 6.213 to 7.","The CEILING (x) function would do just that. Student may answer with using the ROUND(x) command. While this may work, it would have rounded our example down to 6.",Easy,Tableau
What is the difference between measures and dimensions?,"Dimensions are qualitative and used to categorize or segment portions of the data; think grouping by XYZ, Measures are quanititative values which are measurable.",Easy,Tableau
"You recently downloaded Tableau 2021, but the previous employee in your position was using a version from 2 years ago. What is the best way to go about opening/editing their files?","Tableau is backward compatible, so the 2021 version should have no problem opening the older files. However, if people at the company are using an older version, the new files you create with the 2021 version will not work with their older versions.",Easy,Tableau
What does a red pill in Tableau mean?,Red pills are used for errors in Tableau. Green pills indicated continuous data and Blue pills indicate discrete data.,Easy,Tableau
"Your visuailizations are working great, but your data changes regularly and you're having to extract and reconnect regularly. What option might be a better option?",You could use the live data connection option to link directly to the data source so updates to the data source are immediately represented in tableau,Easy,Tableau
How would you initially access a JSON file in tableau.,"Use the Connect menu on the opening screen and then select JSON under the ""To a File"" options",Easy,Tableau
"While creating a new book, you notice a small globe icon next to several of your data fields. What does this denote?","The globe denotes that the field is geographical data. Other icons are ""Abc"" to indicate text, # to indicate a numeric field, and a calendar to indicate a date field. Depending on the type of field, different options may be available. For example, Tableau can use geographical data to easily create a map.",Easy,Tableau
Your coworker just sent you a .twbx file. What does this file include?,This is a Tableau packaged workbook which includes a workbook along with a local copy of the data.,Medium,Tableau
Which chart type helps to view relationships between 2 measures?,"The scatter plot, or a variant like the bubble chart, is best to show the relationship between 2 measures",Medium,Tableau
"You need to work on a subset of the data, but the network is often slow and connecting to the data source is slow as well. The data doesn't change, but you don't need the entire data set. What option is available to resolve this?",You can create an extract file to include only the subset of the dataset you need. This will allow you to work offline and eliminate your need to connect to this data over the network.,Medium,Tableau
"The C suite at your company wants a dashboard of dashboards. Basically, they want a menu of all of the department head's dashboards and the ability to open any dashboard with the click of a button. How could you accomplish this?",Best option is to use Go to actions which is in Tableau for this exact purpose.,Medium,Tableau
Your dashboard is pulling in 3 different sheets and each sheet as 2 filters. What must you do when creating the dashboard to have the filters appear on the dashboard?,"Nothing. The filters will be pulled in automatically. If you don't wish to see them, you can hide them on the dashboard.",Medium,Tableau
What are some considerations when using the live data connection option?,"A live connection could cause slow performace if you're connecting to a large data set or have limited connectivity. If either of those is an issue, then connecting to a static data source is a better option.",Medium,Tableau
"When creating dashboards, what is the difference between tiled objects and floating objects?","Tiled objects will ""snap"" to fixed positions and allows a cleaner, symmetrical setup. Floating objects are completely customizeable and may be placed anywhere.",Medium,Tableau
"You have just begun a meeting with your department to discuss a new table of data you've collected. Your coworker asks you what is the ""grain"" of the data. What are they asking?","The grain of data is what is represented by a single row of unduplicated data. Essentially, your coworking is asking you what has been collected in the table.",Medium,Tableau
"The company is worried that data stored on individual workstations might be lost and not backed up, so they have asked everyone to store their data on the TableauData server. How would you update this?",This can be changed from the File menu. Simply change the Repository Location to the correct folder on the TableauData server and then restart Tableau.,Medium,Tableau
"You've just pulled in data from 3 data sets and noticed that the ""State"" field in one table is the entire state name (""Florida""), the ""State"" field in the next table is the postal abbreviation (""FL""), and the thrid table uses an abbreviation (""Flo""). How can we make it so these items are ""related"" so that if I want totals from Florida, I get them all tallied in the same calculation?","Best option is likely to use Groups in Tableau to link these together since if we've already pulled into Tableau, then we're beyond the clean up stage. That said, it would be acceptable to go back to the source data and update these values if possible.",Medium,Tableau
Your highlight table has lighter and darker colors. What do the difference in these colors tell us?,"Lighter is lower/smaller values; Darker is higher/larger values. The colors are customizable and may also take advantage of ""hot"" vs ""cold"" colors. When different colors are used, for example to represent positive and negative values, the darker colors are the more extreme values.",Medium,Tableau
How can you see new offerings and recently opened file in one place quickly once you've already been working in Tableau for a while today?,The tableau logo at the top of the screen will take you to the Welcome screen which will show you files you've recently worked with and it will show you an assortment of videos and resources to discover new features/options,Meduim,Tableau
What is a blend relationship in Tableau?,"A blend is used when you have data from multiple sources and joining isn't a good option because the data has different levels of granularity. The blend never actually combines the data from the two sources, but displays the data together.",Hard,Tableau
Your boss has specified a very detailed layout for an interactive dashboard with 2 tables located on the left side of the screen vertically and a large chart filling the right side of the screen. What tools/features/options would you use to ensure that the final product looks as close as possible to her vision?,"You would likely use tiled objects and layout containers to group the items together. If your boss wants a more creative (less aligned and less symmetric) layout, then you would likely only use floating objects.",Hard,Tableau
"While in a meeting to plan a new dashboard, Lisa mentions that the sales team use their mobile devices while making sales visits, but they use their laptops when in the office. However, the sales manager doesn't want to alter the default view or for salespeople to use different dashboards. Can we accomodate everyone's needs in this case?","Yes. We can use the ""Fit all"" or the ""Fit width"" options to customize sizes and devices. Additionally, we don't have to affect the default layout. We can still use the same dashboard, but have different views of the objects.",Hard,Tableau
Your company has an internal web application which displays a salesperson's quarterly sales. You would like for the users of your dashboard to be able to click on a salesperson's name and have the internal web application open to show that salesperson's quarterly sales. How could you accomplish this?,The best answer is to use URL actions to link the salesperson to the internal application. A less graceful solution would be to use a drop down menu of the salespeople and have URL coded to accept the correct ID for each salesperson.,Hard,Tableau`
