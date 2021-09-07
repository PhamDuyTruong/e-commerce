import React, {useState, useEffect} from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { Link, useLocation } from 'react-router-dom';
import { commerce } from '../../../lib/commerce';
import useStyles from './styles';


const steps=['Shipping address', 'Payment details'];

export default function Checkout({cart, onCaptureCheckout, order, error, onEmptyCart}) {

    const [activeStep, setActiveStep] =useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();
    const location = useLocation();

    console.log(order);

    let Confirmation =() =>(order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
    ): (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ));

      if(error){
        Confirmation = () => (
            <>
              <Typography variant="h5">Thank you for your purchase !!!</Typography>
              <br />
              <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
             
            </>
          );
          onEmptyCart();
      }

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    useEffect(()=>{
        const generateToken = async() =>{
            try {
              const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});  
              console.log(token);
              setCheckoutToken(token);
            } catch (error) {
                console.log(error);
            }
        }

        generateToken();
    }, [cart]);

    const test = (data) => {
        setShippingData(data);
    
        nextStep();
      };

    const Form =() => activeStep===0 ? <AddressForm checkoutToken={checkoutToken} setShippingData={setShippingData} nextStep={nextStep} test={test}/> : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep}  shippingData={shippingData} backStep={backStep} onCaptureCheckout={onCaptureCheckout}/>



    return (
        <>
             <CssBaseline />
            <div className={classes.toolbar}>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" align="center">Checkout</Typography>
                        <Stepper activeStep={0} className={classes.stepper}>
                            {steps.map((step)=>(
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                    </Paper>
                </main>
            </div>   
        </>
    )
}
