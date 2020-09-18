import React from 'react'
import { connect } from 'react-redux'
import { addProduct, updateProduct } from '../../actions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './index.scss';
import { withRouter } from 'react-router-dom';

class productForm extends React.Component {
    componentDidMount() {
        const state = this.props.location.state;
        if (state) {
            const product = {...state.product};
            const preview = product.photo;
            product.photo = this.dataURLtoFile(state.product.photo, 'product')
            this.setState({product: product, preview, update: true});
        }
    }

    state = { 
        preview: '',
        create: false,
        update: false,
        product: {
            id: '',
            name: '',
            description: '',
            stock: '',
            price: '',
            photo: undefined
        }
    }
    imgRef = React.createRef();

    SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png"
    ];

    convertTobase64 = (file) => {
       let reader = new FileReader();
       reader.onloadend = () => {
           console.log(reader.result, 'result');
           this.setState({preview: reader.result});
       };
       if (file)
           reader.readAsDataURL(file);
   }

   dataURLtoFile = (dataurl, filename) => {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}

    errorSchema = Yup.object({
        name: Yup.string()
            .min(6, 'Must have 6 characters or more')
            .required('Required'),
        description: Yup.string()
            .min(6, 'Must have 6 characters or more')
            .max(250, 'Must have 250 characters or less')
            .required('Required'),
        stock: Yup.number()
            .min(1, 'Must have 1 at least')
            .typeError('Stock have to be a number')
            .required('Required'),
        price: Yup.number()
            .min(1, 'Must have 1 at least')
            .typeError('Price have to be a number')
            .required('Required'),
        photo: Yup.mixed() 
        .test('fileformat', "Unsupported File Format", value => value && this.SUPPORTED_FORMATS.includes(value.type))
        .required('Required')
    });

    handleSubmit = (product) => {
        product.photo = this.state.preview;
        if (!this.state.update) {
            this.props.addProduct(product);
        } else {
            this.props.updateProduct(product);
        }
        // empty fields
        this.setState({preview: '', create: true, update: false});
        this.imgRef.current.value = null;
        setTimeout(() => {
            this.props.history.push('/products');
        }, 1000);
        
    }

   render() {
    return (
             <Formik
                enableReinitialize
                initialValues={this.state.product}
                 validationSchema= {this.errorSchema}
                 onSubmit={ (values, {setSubmitting, resetForm}) => {
                     setSubmitting(true);
                     this.handleSubmit(values);
                     resetForm(this.initialState);
                     setSubmitting(false);
                 }}>{
                     ({isSubmitting, setFieldValue}) => (
                         <Form autoComplete="off" className="form-container">
                             <div className="fields-container">
                                <div>
                                    <h1> Crear producto</h1>
                                </div>
                                <div className="in-container">
                                    <label htmlFor="name">Name</label>
                                    <Field id="name" name="name"/>
                                    <ErrorMessage name="name" component="small" />
                                </div>

                                <div className="in-container">
                                    <label htmlFor="description">Description</label>
                                    <Field id="description" name="description" />
                                    <ErrorMessage name="description" component="small" />
                                </div>

                                <div className="in-container">
                                    <label htmlFor="stock" >Stock</label>
                                    <Field id="stock" name="stock" />
                                    <ErrorMessage name="stock" component="small" />
                                </div>

                                <div className="in-container">
                                    <label htmlFor="price" >Price</label>
                                    <Field id="price" name="price" />
                                    <ErrorMessage name="price" component="small" />
                                </div>

                                <div className="in-container">
                                    <label htmlFor="file" >Image</label>
                                    <input id="file" name="photo" type="file" accept="image/*" ref={this.imgRef}
                                            onChange={(event) => {
                                                this.convertTobase64(event.target.files[0]);
                                                setFieldValue('photo', event.target.files[0]);
                                                }} />
                                    <ErrorMessage name="photo" component="small" />
                                </div>

                                <div className="btn-container">
                                    <button type="submit" disabled={isSubmitting} className="btn">
                                    {!this.state.update ?  'Add product' : 'Update product'  }
                                    </button>
                                </div>
                                {
                                    this.state.create ?
                                        <div className='success-text'>
                                            <span>
                                               {!this.state.update ?  'Product created' : 'Product updated'  }
                                                <img src={process.env.PUBLIC_URL + 'assets/images/check.png'} 
                                                    alt="check" />
                                            </span>
                                        </div>
                                        :
                                        null
                                }
                             </div>
                             <div className="img-container" >
                                {this.state.preview ? <img src={this.state.preview} alt="preview"/> : null}
                            </div>
                         </Form>
                     )
                 }
             </Formik>
     )
   }
}

const mapDispatchToProps = dispatch => {
    return {
        addProduct: product => dispatch(addProduct(product)),
        updateProduct: product => dispatch(updateProduct(product))
    };
};

const ProductForm = withRouter( connect(null,mapDispatchToProps)(productForm));

export default ProductForm;
