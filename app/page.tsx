'use client'

import { stringify } from 'querystring';
import { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";



function ResultsTable({ actions }: any) {
  return (
    <div className="mt-2 flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">

            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="">
                <tr>
                  <th scope="col" className="w-3/5 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  <th scope="col" className="w-2/5 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount you own</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {actions.map((action: any) =>
                  parseInt(action[1]) != 0 ? <tr key={action[0]} className="">
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {action[0]}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {action[1].toFixed(2)} €</td>
                  </tr> : null
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
  );
}

function ResultsChart({ etfs }: any) {

  if (etfs.composition != null) {
    let etfTemp = [];
    etfTemp.push(["Action", "Percentage"]);
    etfs.composition.map((etf: any) => etfTemp.push([etf.compoName, etf.compoValue]));
    //console.log(etfTemp);

    return (
      <Chart
        chartType="PieChart"
        data={etfTemp}
        width={"100%"}
        height={"600px"}
      />
    );
  }
}



export default function Home() {

  const etfList = [
    {
      id: 1,
      name: 'S&P 500',
      composition: [{
        compoId: 1,
        compoName: 'Apple',
        compoValue: 0.60
      }, {
        compoId: 2,
        compoName: 'Microsoft',
        compoValue: 0.40
      }]
    },
    {
      id: 2,
      name: 'NASDAQ',
      composition: [{
        compoId: 1,
        compoName: 'Apple',
        compoValue: 0.55
      }, {
        compoName: 'Amazon',
        compoValue: 0.45
      }]
    },
  ];




  const [etf, setEtf] = useState(etfList[0]); // define the state variable and initialized it with the first value of the table
  //const [amount, setAmount] = useState('');





  const onChangeSelect = (e: any) => {
    const selectedEtf = e.target.value;
    const fullDataEtf = etfList.filter((e) => e.id == selectedEtf)[0];
    setEtf(fullDataEtf);
  }





  /* Début de la decouverte */
  const [isDisabled, setIsDisabled] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [resultatParAction, setResultatParAction] = useState([]);

  useEffect(() => {
    if (inputList.length > 0) {
      inputList[inputList.length - 1].input === ""
        ? setIsDisabled(true)
        : setIsDisabled(false)
    }
  })

  // init the state with a first input inside
  const [inputList, setInputList] = useState([
    {
      input: "",
      etf: "1",
      input_rank: null
    }
  ])

  const handleListAdd = () => {
    setInputList([
      ...inputList,
      {
        input: "",
        etf: "1",
        input_rank: null
      }
    ])
  }

  // trigger everytime input or select value change
  const handleInputChange = (event: any, index: any) => {
    // get value and name of event
    const value = event.target.value;
    const name = event.target.name;
    const newInputList = [...inputList];

    // set the value according to the html element that trigerred the function
    name === 'etfSelection' ? newInputList[index].etf = value : newInputList[index].input = value;
    newInputList[index].input_rank = index + 1

    // set the new input with their value in the state
    setInputList(newInputList);

    // we call the function to recalculate the action dispatch
    calculateActionDispatch();
  }


  const handleRemoveItem = (index: any) => {
    const newList = [...inputList]
    newList.splice(index, 1)
    setInputList(newList)
    console.log(inputList)
    // ici refaire le calcul du totalAmount sinon il s'update pas au delete
    //calculateActionDispatch();
  }






  const calculateActionDispatch = () => {
    console.log("calculte after delete")
    // declare a variable to store the total amount of money for each etf
    let totalByEtf: any = [];
    let tempTotal = 0;

    // go through all the etfList


    // go through the etfList
    etfList.map((etf) => {
      // go through all the inputList
      inputList.map((statedInput) => {
        // if an etf in the state correspond to a etf in the etfList, we add data 
        parseInt(statedInput.etf) == etf.id ? tempTotal += parseInt(statedInput.input) : null;
      })
      // push the data in an array
      totalByEtf.push([etf.id, tempTotal]);
      // reset the temp variable
      tempTotal = 0;
    });

    let finalTableToDisplay: any = [];
    let shouldPush = true;
    // parcourir le tableau totalByEtf
    totalByEtf.map((element: any) => {
      let idEtf = element[0];
      let value = element[1];
      const fullDataEtf = etfList.filter((e) => e.id == idEtf)[0]; // je récupère la data de l'etf que je parcours
      fullDataEtf.composition.map((r) => { // je parcours la composition de l'etf en question
        // je dois comparer si l'id de mon r est déjà présent dans mon tableau finalTableToDisplay
        finalTableToDisplay.map((f: any) => {
          if (f[0] == r.compoName) {
            f[1] += r.compoValue * value;
            shouldPush = false;
          }
        })
        shouldPush ? finalTableToDisplay.push([r.compoName, r.compoValue * value]) : null;
        shouldPush = true;
      })
    })
    setResultatParAction(finalTableToDisplay);
    //console.log(resultatParAction);
  }







  return (
    <div className='h-screen p-2'>
      <div className="w-full text-2xl text-center">ETF Scanner</div>

      {inputList.length > 0
        ? inputList.map((input, index) => (
          <div key={index}
            className="w-full flex mt-2">

            <select
              name="etfSelection"
              id="etfs"
              onChange={(event: any) => handleInputChange(event, index)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {etfList.map((etf) =>
                <option
                  value={etf.id}
                  key={etf.id}>{etf.name}
                </option>)}
            </select>
            <input
              name="amountSelection"
              type="number"
              id="amount"
              placeholder='Amount'
              className="ml-2 w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(event: any) => handleInputChange(event, index)}
              value={input.input}
            />
            <button className="ml-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => handleRemoveItem(index)}>
              Delete
            </button>

          </div>
        ))
        : null}


      {isDisabled ?
        <button
          className="cursor-not-allowed mt-2 w-full text-center bg-blue-300 text-white font-bold py-2 px-4 rounded"
          onClick={handleListAdd}
          disabled={isDisabled}>
          Add new Portfolio
        </button> :
        <button
          className="mt-2 w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleListAdd}
          disabled={isDisabled}>
          Add new Portfolio
        </button>
      }




      <ResultsTable actions={resultatParAction} />








      {/*
        etf.composition ?
          <ResultsTable etfs={etf} totalAmount={amount} /> :
          <p className="pt-2">No data</p>
    */}

      {/*<ResultsChart etfs={etf} />*/}


    </div >
  )
}

/* {/*<ResultsTable actions={resultatParAction} />*/