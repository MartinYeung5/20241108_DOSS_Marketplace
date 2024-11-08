import { useCurrentAccount, useSuiClientQuery, useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";
import { TransactionBlock } from '@mysten/sui.js/transactions';
import Button from "./Button";
import FileUploaderMain from "./FileUploaderMain";

import { useState } from 'react';
import md5 from "md5";

export default function CreateContract() {
  const { mutate: signAndExecuteTransactionBlock } =
    useSignAndExecuteTransactionBlock();
  //const [digest, setDigest] = useState('');
  //const currentAccount = useCurrentAccount();
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [md5Hash, setMd5Hash] = useState("");
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    const hash = md5(event.target.files[0]);
    console.log("hash =" + hash);
    setMd5Hash(hash);
    setIsFilePicked(true)
  };

  console.log("selectedFile =" + selectedFile);
  console.log("md5Hash =" + md5Hash);

  const demo = async () => {
    try {
      const packageObjectId =
        '0xaa6a9e400c302ef1330aa1bca1881f71179ac3f6b81648b9ecfc25e951c9204b';
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${packageObjectId}::digital_contract_20240521::create_contract`,
        arguments: [
          tx.pure.address(
            '0x440a564c98eaa78c4f791a0d5642a833f32b8d33b71731ea35074435f04eb088'
          ),
          tx.pure.string('hashed_a20240524'),
        ],
      });

      const response = await signAndExecuteTransactionBlock(
        {
          transactionBlock: tx,
          options: {
            showEffects: true,
            showBalanceChanges: true,
            showEvents: true,
          },
        },
        {
          onSuccess: (result) => {
            console.log(result, 'result');
          },
          onError: (error) => {
            console.log('error', error);
          },
        }
      );

      // Logging the response and effects
      console.log({ response });
      console.log(response);
    } catch (error) {
      console.error('Error during NFT minting process:', error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between p-10">
      <div className="">
        <h1>Staking Section</h1>

        <br />
        <Button onClick={demo}>Create Staking</Button>
      </div>
    </main>
  );
}