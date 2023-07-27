'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";




/*const etfList = [
  'CAC',
  'NASDAQ'
];*/




/*function calculate(id: number, value: number) {
  console.log('coucou here : ', etfList[id].compo[0].name)
  return value * etfList[id].compo[0].pourcentage;
}*/

/*function Result({ etf, amount }) {
  return <div>
    {etf ? etf : 'default text'}
    {amount ? amount : null}
  </div>
}*/



//console.log(calculate(0, 500));


function ResultsTable({ etfs, totalAmount }: any) {
  //console.log(etfs);
  return (
    <div className="mt-2 flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">

            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="">
                <tr>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {etfs ?
                  etfs.composition ?
                    etfs.composition.map((compo: any) =>
                      <tr key={compo.compoName} className="">
                        <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {compo.compoName}</td>
                        <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {(compo.compoValue * 100).toFixed(2)}%</td>
                        <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {(compo.compoValue * totalAmount).toFixed(2)}€</td>
                      </tr>) :
                    null :
                  null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
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
  const [amount, setAmount] = useState(''); // define the state variable and initialized it with the first value of the table





  const onChangeSelect = (e: any) => {
    const selectedEtf = e.target.value;
    const fullDataEtf = etfList.filter((e) => e.id == selectedEtf)[0];
    setEtf(fullDataEtf);
  }





  /* Début de la decouverte */
  const [isDisabled, setIsDisabled] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
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
  const handleInputChange = (event: any, index: any) => {
    /*const { value } = event.target
    const newInputList = [...inputList]
    newInputList[index].input = value
    newInputList[index].input_rank = index + 1
    setInputList(newInputList)
    let amount = 0;
    inputList.map((input) => {
      amount += parseInt(input.input);
    })
    setTotalAmount(amount)*/
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const newInputList = [...inputList]
    target.name === 'etfSelection' ? newInputList[index].etf = value : newInputList[index].input = value;
    //newInputList[index].input = value
    //newInputList[index].etf = value
    newInputList[index].input_rank = index + 1
    setInputList(newInputList)
    //console.log(inputList);
    resultatsAvecEtf();
  }

  const handleRemoveItem = (index: any) => {
    const newList = [...inputList]
    newList.splice(index, 1)
    setInputList(newList)
    // ici refaire le calcul du totalAmount sinon il s'update pas au delete
  }

  //console.log(inputList)
  /* fin de la décougette*/





  const [resultatParAction, setResultatParAction] = useState([]);

  const resultatsAvecEtf = () => {
    let resu = [];
    let temp = 0;
    for (let i = 1; i <= etfList.length; i++) {
      inputList.map((e) => {
        parseInt(e.etf) == i ? temp += parseInt(e.input) : null;
      })
      resu.push([i, temp])
      temp = 0
    }

    resultatsParAction(resu)
  }


  const resultatsParAction = (resu: any) => {
    //console.log('resu avec etf')
    //console.log(resu)
    let tempData: any = []
    let finalTableToDisplay: any = []
    let shouldPush = true
    //let resuEtf = []
    // parcourir le tableau resu
    resu.map((element: any) => {
      let idEtf = element[0];
      let value = element[1];
      const fullDataEtf = etfList.filter((e) => e.id == idEtf)[0]; // je récupère la data de l'etf que je parcours
      fullDataEtf.composition.map((r) => { // je parcours la composition de l'etf en question
        // je dois comparer si l'id de mon r est déjà présent dans mon tableau finalTableToDisplay
        /*finalTableToDisplay.map((f: any) => {
          //console.log(f[0] + ' == ' + r.compoName)
          f[0] == r.compoName ? f[1] += r.compoValue : null

        })*/

        finalTableToDisplay.map((f: any) => {
          if (f[0] == r.compoName) {
            f[1] += r.compoValue * value
            shouldPush = false
          }
          //f[0] == r.compoName ? f[1] = r.compoValue * value && shouldPush = false : null

        })


        shouldPush ? finalTableToDisplay.push([r.compoName, r.compoValue * value]) : null
        shouldPush = true

      })

      //resuEtf[index].push
    })
    // pour chaque element dans resu, je prend son id et je le compare a un id dans etfList

    // je dois push chaque ligne dans un tableau
    //console.log('final table to display')

    setResultatParAction(finalTableToDisplay)
    //console.log(resultatParAction)
  }







  return (
    <div className='h-screen p-2'>
      <div className="w-full text-2xl text-center">ETF Scanner</div>

      {/*<div className="mt-2">
        <select
          id="etfs"
          onChange={e => onChangeSelect(e)}
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {etfList.map((etf) =>
            <option
              value={etf.id}
              key={etf.id}>{etf.name}
            </option>)}
        </select>


        <input
          type="number"
          id="amount"
          placeholder="Amount"
          onChange={e => setAmount(e.target.value)}
          className="mt-2 w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
          </div>*/}










      {inputList.length > 0
        ? inputList.map((input, index) => (
          <div key={index}
            className="w-full flex mt-2">

            <select
              name="etfSelection"
              id="etfs"
              //onChange={e => onChangeSelect(e)}
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
              //onChange={(event: any) => handleInputChange(event, index)}
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





      {resultatParAction}







      {/*
        etf.composition ?
          <ResultsTable etfs={etf} totalAmount={amount} /> :
          <p className="pt-2">No data</p>
    */}

      {/*<ResultsChart etfs={etf} />*/}


    </div >
  )
}

/*  
onChange={e => setEtf(e.target.value)}

      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Calculte</button>


      <div>
        {etf ? etf.composition ? etf.composition.map((ze) => <p key={ze.compoName}>{ze.compoName} : {ze.compoValue * parseInt(amount)}€</p>) : null : null}
      </div>





      <div className="w-full">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Action</th>
            <th>Percentage</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {etfs ?
            etfs.composition ?
              etfs.composition.map((compo) =>
                <tr>
                  <td>{compo.compoName}</td>
                  <td>{(compo.compoValue * 100).toFixed(2)}%</td>
                  <td>{(compo.compoValue * totalAmount).toFixed(2)}€</td>
                </tr>) :
              null :
            null}
        </tbody>
      </table>
    </div>
   
      */
