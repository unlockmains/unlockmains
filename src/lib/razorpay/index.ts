let Razorpay: any;

if (typeof window !== 'undefined') {
    Razorpay = (window as any).Razorpay;
}

export default Razorpay;