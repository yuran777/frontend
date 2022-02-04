import { useState } from 'react'
import Image from 'next/image'
import NumberFormat from 'react-number-format'

import Field from 'components/Field'
import Radio from 'components/Radio'

import ChevronsIcon from '@hashicorp/flight-icons/svg/chevrons-right-24.svg'
import CheckIcon from '@hashicorp/flight-icons/svg/check-circle-24.svg'
import FailIcon from '@hashicorp/flight-icons/svg/x-square-24.svg'

export default function PaymentForm(props) {
  const [hasAutofilled, setHasAutofilled] = useState(false);
  
  const [visaSelected, setVisaSelected] = useState(true);
  const [mastercardSelected, setMastercardSelected] = useState(false);
  const [amexSelected, setAmexSelected] = useState(false);
  
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvcNumber, setCvcNumber] = useState('');
      
  const formComplete = cardholderName != "" && cardNumber != "" && expiryDate != "" && cvcNumber != "";
  
  const submit = async (event) => {
    props.setHasPaid(true);
    event.preventDefault();
  };
  
  const autofill = async (event) => {
    setCardholderName('A. Customer');
    setCardNumber('1234123412341234');
    setExpiryDate('122030');
    if (amexSelected) {
      setCvcNumber('1234');
    } else {
      setCvcNumber('123');
    }
    event.preventDefault();
  };
  
  const onCardChange = async (event) => {
    const selectedRadio = event.target.id
    if (selectedRadio == 'card-visa') {
      setVisaSelected(true)
      setMastercardSelected(false)
      setAmexSelected(false)
    } else if (selectedRadio == 'card-mastercard') {
      setVisaSelected(false)
      setMastercardSelected(true)
      setAmexSelected(false)
    } else if (selectedRadio == 'card-amex') {
      setVisaSelected(false)
      setMastercardSelected(false)
      setAmexSelected(true)
    }
  };
  
  return (
    <>
      {props.hasPaid ? (
        <PaymentStatus />
      ) : (
        <form className="flex flex-col w-full p-8 text-left" onSubmit={submit}>
          <div className="space-y-2 pb-8">
            <h2 className="font-semibold text-2xl sm:text-3xl leading-none sm:leading-tight sm:truncate">Make payment</h2>
            <p className="text-black/75 dark:text-white/75 text-sm sm:text-base">Use any card details or <button className="text-blue-500 dark:text-blue-400 underline hover:bg-blue-50 dark:hover:bg-blue-500/25 py-1 px-1 -mx-1 rounded-lg transition" onClick={autofill}>autofill</button>. No payment will be taken.</p>
          </div>
          
          <fieldset className="mb-4">
            <ul className="flex space-x-4" onChange={onCardChange}>
              <Radio id="card-visa" label="Visa" value="visa" isChecked={visaSelected} />
              <Radio id="card-mastercard" label="Mastercard" value="mastercard" isChecked={mastercardSelected} />
              <Radio id="card-amex" label="Amex" value="amex" isChecked={amexSelected} />
            </ul>
          </fieldset>
          
          <fieldset className="flex">
            <Field value={cardholderName} setter={setCardholderName} id="cardholder" type="text" label="Cardholder Name*" placeholder="Enter name" />
          </fieldset>
          
          <fieldset className="flex">
            <Field value={cardNumber} setter={setCardNumber} id="number" type="cardnumber" label="Card Number*" placeholder="Enter card number" />
          </fieldset>
          
          <fieldset className="grid grid-cols-2 gap-6">
            <Field value={expiryDate} setter={setExpiryDate} id="expiry" type="cardexpiry" label="Expiry Date*" placeholder="MM/YYYY" />
            <Field value={cvcNumber} setter={setCvcNumber} id="cvc" type="cardcvc" label="CVC*" placeholder="***" />
          </fieldset>
                    
          <SubmitButton disabled={!formComplete} />
        </form>
      )}
    </>
  )
}

function SubmitButton(props) {
  
  return (
    <button className={`${props.disabled ? 'bg-gray-200 dark:bg-white/5 text-black/25 dark:text-white/25' : 'bg-black/90 dark:bg-white/90 hover:bg-black dark:hover:bg-white text-white dark:text-black/75 shadow-subtle'} relative flex items-center justify-between w-full h-[72px] px-8 mt-12 text-left text-white rounded-lg  group transition duration-500 ease-in-out overflow-hidden translate-x-0`} disabled={props.disabled}>
      <span className={`${props.disabled ? 'opacity-0' : 'opacity-100'} absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-white/0 via-white/20 dark:via-white/75 to-white/0 shimmer transition ease-in-out`}></span>
      <span className="uppercase tracking-widest text-lg">Pay now</span>
      <span className={`${props.disabled ? 'opacity-0' : 'opacity-75 group-hover:opacity-100'} flex items-center invert dark:invert-0 group-hover:translate-x-[8px] transition duration-500 ease-in-out`}>
        <Image src={ChevronsIcon} />
      </span>
    </button>
  )
}

function PaymentStatus(props) {
  
  return (
    <div className="flex flex-col text-left p-8 dark:text-white/90">
      <div className="space-y-2 pb-8">
        <h2 className="font-semibold text-2xl sm:text-3xl leading-none sm:leading-tight capitalize sm:truncate">Payment received</h2>
        <p className="text-black/75 dark:text-white/75 text-sm sm:text-base">(But not taken, because this is just a demo)</p>
      </div>
      
      <div className="flex flex-col items-start space-y-2 pb-5 mb-5 border-b border-gray-200 dark:border-white/10">
        <p className="text-black/75 dark:text-white/75">Status</p>
        <p className="flex space-x-3 text-base">
          <Image src={CheckIcon} className="icon-green" />
          <span>Payment processed successfully</span>
        </p>
      </div>
      
      <div className="flex flex-col items-start space-y-2 pb-5 mb-5">
        <p className="text-black/75 dark:text-white/75">Encryption Status</p>
        <p className="flex space-x-3 text-base">
          <Image src={FailIcon} className="icon-red" />
          <span>Encryption is disabled</span>
        </p>
      </div>
      
      <div className="flex flex-col items-start space-y-1 px-6 py-4 bg-gray-100/50 dark:bg-white/5 shadow-stroke dark:shadow-highlight rounded-lg">
        <p className="text-black/75 dark:text-white/75">Plain text card number</p>
        <NumberFormat className="font-mono" format="#### #### #### ####" value="1234123412341234" displayType="text" />
      </div>
      
      <p className="text-black/75 dark:text-white/75 text-sm mt-6">Card details returned for demo purposes, not for production.</p>
    </div>
  )
}
