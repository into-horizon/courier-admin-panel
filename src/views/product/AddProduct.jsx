import React, { useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { CFormSelect, CFormLabel, CFormText, CFormCheck, CFormInput, CButton, CFormFloating, CFormTextarea, CFormFeedback, CCol, CForm, CRow, CInputGroup, CInputGroupText } from '@coreui/react'
import { If, Then, Else } from 'react-if'
import { useSelector, connect, useDispatch } from 'react-redux';
import { addProductHandler, errorMessage } from 'src/store/product';
import { usePopup, DialogType, AnimationType, ToastPosition } from "react-custom-popup";
import { useTranslation } from 'react-i18next';
import ColorSelector from 'src/components/ColorSelector';
import Colors from '../../services/colors'
import CIcon from '@coreui/icons-react';
import { cilTrash, cilPlus } from '@coreui/icons';


const AddProduct = props => {

    const dispatch = useDispatch()
    const { showOptionDialog, showToast, showAlert } = usePopup();
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'addProduct' });
    const color = useTranslation('translation', { keyPrefix: 'colors' })
    const category = useSelector(state => state.category)
    const products = useSelector(state => state.products)
    const { addProductHandler } = props

    let sizeSymbols = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
    let sizeNumbers = []
    if (sizeNumbers.length === 0) {
        for (let i = 30; i <= 50; i++) {
            sizeNumbers.push(i)
        }

    }

    const initialState = {
        values: [],
        secondCategory: { visible: false, data: [] },
        thirdCategory: { visible: false, selected: false, add: false, select: true, data: [] },
        sizes: { visible: false, add: false },
        selectedSizes: [],
        sizesDetails: [],
        discount: { hasDiscount: false, discountRate: 0 },
        colorsAndSizes: { colorsOrSizes: false, colors: true, sizes: false, quantityDetails: [] }
    }
    const [values, setValues] = useState([])
    const [secondCategory, setSecondCategory] = useState({ visible: false, data: [] })
    const [thirdCategory, setThirdCategory] = useState({ visible: false, selected: false, add: false, select: true, data: [] })
    const [sizes, setSizes] = useState({ visible: false, add: false, data: [...sizeSymbols] })

    const [discount, setDiscount] = useState({ hasDiscount: false, discountRate: 0 })

    const [colorsAndSizes, setColorsAndSizes] = useState(initialState.colorsAndSizes)



    const updateSizeColor = e => {
        let newOne = colorsAndSizes.quantityDetails.map(val => {
            if (val.id === Number(e.target.id)) {
                return { ...val, color: e.target.value }
            } else return val
        })
        setColorsAndSizes({ ...colorsAndSizes, quantityDetails: newOne })

    }
    const updateSizeQuantity = e => {
        let newOne = colorsAndSizes.quantityDetails.map(val => {
            if (val.id === Number(e.target.id)) {
                return { ...val, quantity: Number(e.target.value) }
            } else return val
        })
        setColorsAndSizes({ ...colorsAndSizes, quantityDetails: newOne })
    }

    const updateColorQuantity = e => {
        let newOne = colorsAndSizes.quantityDetails.map(val => {
            if (val.color === e.target.id) {
                return { ...val, quantity: Number(e.target.value) }
            } else return val
        })
        setColorsAndSizes({ ...colorsAndSizes, quantityDetails: newOne })
    }
    const select = e => {
        let arr = colorsAndSizes.quantityDetails.map(x => x.size)
        let x = e.filter(value => !arr.includes(value.name))
        let y = x.map((x, i) => { return { id: colorsAndSizes.quantityDetails.length + 1, idx: colorsAndSizes.quantityDetails.length, size: x.name, color: colorsAndSizes.colors ? 'White' : null, quantity: 0 } })
        setColorsAndSizes(e => { return { ...colorsAndSizes, quantityDetails: [...colorsAndSizes.quantityDetails, ...y] } })
    }
    const selectColors = e => {
        let arr = colorsAndSizes.quantityDetails.map(x => x.color)
        let x = e.filter(value => !arr.includes(value.name))
        let y = x.map((x, i, array) => {
            return { id: colorsAndSizes.quantityDetails.length + 1, size: null, color: x.name, quantity: 0 }
        })
        setColorsAndSizes({ ...colorsAndSizes, quantityDetails: [...colorsAndSizes.quantityDetails, ...y] })
    }
    const removeColors = e => {

        let y = colorsAndSizes.quantityDetails.filter(val => e.find(v => v.name === val.color))
        setColorsAndSizes({ ...colorsAndSizes, quantityDetails: y })
    }
    const remove = e => {
        // let y =  colorsAndSizes.quantityDetails.filter( val => e.includes(val.size))
        let y = colorsAndSizes.quantityDetails.filter(val => !!e.filter(v => v.name === val.size)[0])
        setColorsAndSizes({ ...colorsAndSizes, quantityDetails: y })
    }
    const addSizeColor = (size, idx) => {
        let newColor = { id: colorsAndSizes.quantityDetails.length + 1, idx: idx + 1, size: size, color: 'White', quantity: 0 }
        let arr = [...colorsAndSizes.quantityDetails]
        arr.splice(newColor.idx, 0, newColor)
        let final = arr.map((val, i) => { return { ...val, idx: i } })
        setColorsAndSizes(w => { return { ...colorsAndSizes, quantityDetails: final } })
    }
    const deleteSizeColor = id => {
        let newArr = colorsAndSizes.quantityDetails.filter(val => val.id !== id)
        setColorsAndSizes({ ...colorsAndSizes, quantityDetails: newArr })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        // console.log("🚀 ~ file: AddProduct.jsx ~ line 117 ~ submitHandler ~ olorsAndSizes.quantityDetails.reduce((p, c) => p + Number(c.quantity), 0) ", colorsAndSizes.quantityDetails.reduce((p, c) => p + Number(c.quantity), 0) )
        let obj = {
            entitle: e.target.entitle.value,
            artitle: e.target.artitle.value,
            metatitle: e.target.metatitle.value,
            sku: e.target.sku.value,
            price: Number(e.target.price.value),
            brand_name: e.target.brandName.value,
            quantity: colorsAndSizes.quantityDetails.reduce((p, c) => p + Number(c.quantity), 0) || Number(e.target.quantity.value),
            endescription: e.target.endescription.value,
            ardescription: e.target.ardescription.value,
            parent_category_id: e.target.parentCategory.value,
            child_category_id: e.target.childCategory.value,
            grandchild_category_id: e.target.grandChildCategory?.value === 'default' ? null : (e.target.grandChildCategory?.value || null),
            size_and_color: colorsAndSizes.quantityDetails.length > 0 ? JSON.stringify(colorsAndSizes.quantityDetails) : null,
            discount: discount.hasDiscount,
            discount_rate: discount.discountRate,
        }


        let formData = new FormData();
        if (e.target.image.files.length > 5) {
            return showAlert({

                type: DialogType.WARNING,
                text: t('imageLimitText'),
                title: t('imageLimit'),
                animationType: AnimationType.ZOOM_IN,
            })
        }
        if (obj.parent_category_id === 'default' || obj.child_category_id === 'default' || (obj.grandchild_category_id === 'default' && thirdCategory.selected)) {
            return showAlert({
                type: DialogType.WARNING,
                text: t('categoryText'),
                title: t('categoryTitle'),
                animationType: AnimationType.ZOOM_IN,
            })

        }
        for (let i = 0; i < e.target.image.files.length; i++) {
            formData.append('image', e.target.image.files[i], e.target.image.files[i].name)
        }
        Object.entries(obj).forEach(([key, value]) => {
            if (value === null) {
                return
            } else {
                formData.append(key, value)
            }
        }
        )
        addProductHandler(formData)

    }

    const categoryVisibility = e => {
        let w = category.childCategories.filter(val => val.parent_id === e.target.value)
        let x = { ...secondCategory, visible: true, data: w }
        setSecondCategory(x)
        setThirdCategory(initialState.thirdCategory)
    }
    const categoryVisibility2 = e => {
        let w = category.grandChildCategories.filter(val => val.parent_id === e.target.value)
        let x = { ...thirdCategory, visible: true, data: w }
        setThirdCategory(x)
    }

    const addSizes = e => {

        setValues(i => [...e.target.value.split(',')])
        if (e.target.value.includes(',')) {
        }

    }

    useEffect(() => {
        let productForm = document.getElementById('productForm');
        if (products.message.includes('successfully')) {
            showToast({
                type: DialogType.SUCCESS,
                text: t('doneSuccessfully'),
                timeoutDuration: 3000,
                showProgress: true,
                position: ToastPosition[t('position')]
            })
            productForm.reset()
            setSecondCategory({ ...secondCategory, ...initialState.secondCategory })
            setThirdCategory({ ...thirdCategory, ...initialState.thirdCategory })
            setSizes({ ...sizes, ...initialState.sizes })
            setDiscount({ ...discount, ...initialState.discount })
            setColorsAndSizes(initialState.colorsAndSizes)
        } else if (products.message.includes('something')) {
            showAlert({
                type: DialogType.DANGER,
                text: t('somethingWentWrong'),
                timeoutDuration: 3000,
                showProgress: true,
            })
        } else if (products.message) {
            showAlert({
                type: DialogType.ALERT,
                text: products.message,
                timeoutDuration: 3000,
                showProgress: true,
            })
        }
        dispatch(errorMessage({ message: '' }))
    }, [products.message])

    useEffect(() => {
        let labels = document.querySelectorAll('#label')
        if (i18n.language === 'ar') {
            labels.forEach(label => label.setAttribute('class', 'rightBorder'))
        } else if (i18n.language === 'en') {
            labels.forEach(label => label.setAttribute('class', 'leftBorder'));
        }

    }, [i18n.language])

    const resetSizes = () => {
        setColorsAndSizes({ ...colorsAndSizes, quantityDetails: [] })
    }
    useEffect(() => {

        console.log("🚀 ~ file: AddProduct.jsx ~ line 238 ~ colorsAndSizes", colorsAndSizes.quantityDetails)
    }, [colorsAndSizes])

    return (
        <>

            <h2>{t('add_product')}</h2>
            {/* <ColorSelector onChange={e => console.log(e.target.value)} /> */}

            <form id='productForm' className="productForm" onSubmit={submitHandler}>
                <section className="productInputs">
                </section>
                <CRow xs={{ cols: 'auto' }}>
                    <div className="row justify-content-md-center mrgn50">
                        <CCol  >
                            <CCol>

                                <label>{t('englishTitle')}*</label>
                            </CCol>
                            <CCol>
                                <input type="text" id="entitle" placeholder={t('englishTitle')} required />

                            </CCol>

                        </CCol>
                        <CCol   >
                            <CCol>
                                <label >{t('arabicTitle')}*</label>

                            </CCol>
                            <CCol>
                                <input type="text" id="artitle" placeholder={t('arabicTitle')} required />

                            </CCol>
                        </CCol>
                        <CCol >
                            <CCol>

                                <label >{t('metaTitle')}</label>
                            </CCol>
                            <CCol>
                                < input type="text" id="metatitle" placeholder={t('metaTitle')} />

                            </CCol>
                        </CCol>
                        <CCol >
                            <CCol>
                                <label >SKU</label>

                            </CCol>
                            <CCol>

                                < input type="text" id="sku" placeholder="SKU" />
                            </CCol>
                        </CCol>
                        <CCol >
                            <CCol>
                                <label >{t('price')}*</label>

                            </CCol>
                            <CCol>
                                < input type="number" className={`no${i18n.language}`} id="price" placeholder={t('price')} step='0.01' required />

                            </CCol>
                        </CCol>
                        <CCol  >
                            <CCol>
                                <label >{t('brandName')}</label>

                            </CCol>
                            <CCol>
                                <input type="text" id="brandName" placeholder={t('brandName')} />

                            </CCol>
                        </CCol>
                        {!colorsAndSizes.colorsOrSizes && <CCol sm="auto" >

                            <CRow>

                                <label>{t('quantity')}*</label>
                            </CRow>
                            <CRow>

                                <input type="number" id="quantity" className={`no${i18n.language}`} placeholder={t('quantity')} />
                            </CRow>
                            <CRow>
                                <label>{t('quantityLabel')}</label>

                            </CRow>



                        </CCol>}

                    </div>
                </CRow>

                <div className="row justify-content-md-center mrgn50">
                    <div className='description'>
                    </div>


                    <CCol md={6}>
                        <CFormFloating>
                            <CFormTextarea
                                placeholder="Leave a comment here"
                                id="endescription"
                                style={{ height: '100px' }}
                            ></CFormTextarea>
                            <CFormLabel htmlFor="floatingTextarea2" required>{t('englishDescrition')}*</CFormLabel>
                        </CFormFloating>
                    </CCol>
                    <CCol md={6}>
                        <CFormFloating>
                            <CFormTextarea
                                placeholder="Leave a comment here"
                                id="ardescription"
                                style={{ height: '100px' }}
                            ></CFormTextarea>
                            <CFormLabel htmlFor="floatingTextarea3" required>{t('arabicDescription')}*</CFormLabel>
                        </CFormFloating>
                    </CCol>

                </div>
                <div className='marginDiv'>
                    <CFormSelect aria-label="Default select example" required onChange={categoryVisibility} id='parentCategory'>
                        <option value='default'>{t('parentCategory')}</option>
                        {category ? category.parentCategories.map((val, idx) =>
                            <option value={val.id} key={`parent_Category_${idx}`}>{val[`${i18n.language}title`]}</option>
                        )

                            : null}

                    </CFormSelect>
                </div>
                <div className='marginDiv'>
                    <CFormSelect aria-label="Default select example" disabled={!secondCategory.visible} onChange={categoryVisibility2} id='childCategory'>
                        <option value='default'>{t('childCategory')}</option>

                        {secondCategory.data.map((val, idx) =>
                            <option value={val.id} key={`child_Category_${idx}`}>{val[`${i18n.language}title`]}</option>
                        )

                        }
                    </CFormSelect>
                </div>

                {thirdCategory.data.length > 0 && <section className="TCS" >
                    <section>
                        <CFormCheck id="flexCheckDefault" label={t('selectOrAdd')} onChange={e => setThirdCategory({ ...thirdCategory, selected: e.target.checked })} />
                    </section>
                    <section style={{ display: thirdCategory.selected ? 'inherit' : 'none', width: '30%' }}>
                        <section>
                            <CFormCheck type="radio" name="TC" id="TC1" label={t('selectThird')} defaultChecked onChange={e => setThirdCategory({ ...thirdCategory, select: !thirdCategory.select, add: !thirdCategory.add })} />

                        </section>
                        <section>

                            <CFormCheck type="radio" name="TC" id="TC2" label={t('addOwn')} onChange={e => setThirdCategory({ ...thirdCategory, select: !thirdCategory.select, add: !thirdCategory.add })} disabled />
                        </section>

                        <CFormSelect aria-label="Default select example" id='grandChildCategory' disabled={!thirdCategory.visible} style={{ display: thirdCategory.select ? 'inherit' : 'none' }} >
                            <option value='default'>{t('grandChildCategory')}</option>

                            {category ? thirdCategory.data.map((val, idx) =>
                                <option value={val.id} key={`grand_child_Category_${idx}`}>{val[`${i18n.language}title`]}</option>
                            )

                                : null}
                        </CFormSelect>


                        <input type={thirdCategory.add ? 'text' : 'hidden'} placeholder={t('addOwn')} className='thirdCategory' disabled={!thirdCategory.visible} id='addGrandChildCategory' />
                    </section>


                </section>}
                <section className="TCS" >

                    <section>
                        <CFormCheck id="size" label={t('sizes')} onChange={e => setColorsAndSizes({ ...colorsAndSizes, colorsOrSizes: e.target.checked })} />
                    </section>
                    {colorsAndSizes.colorsOrSizes && <>
                        <section className="radioBtns">
                            <section>
                                <CFormCheck type="radio" name="sc" id="TC1" label='colors only' defaultChecked onChange={e => setColorsAndSizes({ ...colorsAndSizes, colors: e.target.checked, sizes: !e.target.checked, quantityDetails: [] })} />

                            </section>
                            <section>
                                <CFormCheck type="radio" name="sc" id="TC1" label='sizes only' onChange={e => setColorsAndSizes({ ...colorsAndSizes, colors: !e.target.checked, sizes: e.target.checked, quantityDetails: [] })} />

                            </section>
                            <section>
                                <CFormCheck type="radio" name="sc" id="TC1" label='sizes and colors' onChange={e => setColorsAndSizes({ ...colorsAndSizes, colors: e.target.checked, sizes: e.target.checked, quantityDetails: [] })} />

                            </section>
                        </section>
                        <section style={{ maxWidth: '20rem' }}>
                            {colorsAndSizes.colors && !colorsAndSizes.sizes && <Multiselect options={Colors.map((val, idx) => { return { name: color.t(val), id: idx + 1 } })}
                                onSelect={selectColors}
                                onRemove={removeColors}
                                selectedValues={e => console.log(e)}
                                displayValue="name"
                                placeholder={t('select')}
                            />}
                        </section>
                        {colorsAndSizes.sizes && <section className='radioBtns' style={{ width: '40%' }}>
                            <section>
                                <CFormCheck type="radio" name="s" id="TC1" label={t('symbolSizes')} defaultChecked onChange={() => { setSizes({ ...sizes, data: [...sizeSymbols], add: false }); resetSizes(); }} />

                            </section>

                            <section>

                                <CFormCheck type="radio" name="s" id="TC2" label={t('numericSizes')} onChange={() => { setSizes({ ...sizes, data: [...sizeNumbers], add: false }); resetSizes() }} />
                            </section>
                            <section>

                                <CFormCheck type="radio" name="s" id="TC2" label={t('addOther')} onChange={() => { setSizes({ ...sizes, add: true }); resetSizes() }} />
                            </section>
                            <If condition={!sizes.add}>
                                <Then>
                                    <Multiselect options={sizes.data.map((val, idx) => { return { name: val, id: idx + 1 } })}
                                        onSelect={select}
                                        onRemove={remove}
                                        selectedValues={e => console.log(e)}
                                        displayValue="name"
                                        placeholder={t('select')}
                                    />

                                </Then>
                                <Else>
                                    <CRow >
                                        {/* <CFormLabel htmlFor="validationServer05">{t('sizes')}</CFormLabel> */}
                                        <CFormInput type="text" id="sizesInput" placeholder={t('inserSizes')} required onChange={addSizes} />
                                        <CButton color="secondary" type="button" onClick={(e) => { select(values.map((val, idx) => { return { name: val, id: idx++ } })); document.getElementById('sizesInput').value = '' }} >
                                            {t('add')}
                                        </CButton>
                                    </CRow>
                                </Else>
                            </If>
                        </section>}
                        {colorsAndSizes.quantityDetails.length > 0 && <div className="sizesContainer" style={{ overflowY: 'scroll', maxHeight: '15rem', width: '30rem', maxWidth: '100%', padding: '1rem', border: '1px solid black', backgroundColor: '#fff', margin: '1rem 0' }}>
                            {colorsAndSizes.sizes && colorsAndSizes.quantityDetails.map((val, idx) =>
                                <div key={`size${idx}`} className="marginDiv sizesDiv"  >
                                    <h5 className="sizeHead">{val.size}: </h5>
                                    {colorsAndSizes.colors && <ColorSelector key={val['id']} id={val['id']} onChange={updateSizeColor} value={val.color} />}
                                    <input type="number" id={val['id']} key={`sizeQty${val['id']}`} placeholder={t('quantity')} onChange={updateSizeQuantity} className={`no${i18n.language}`} />
                                    {colorsAndSizes.sizes&& colorsAndSizes.colors && <div>
                                        <CIcon icon={cilPlus} size="xl" className="pointer" title="add another color" onClick={() => addSizeColor(val.size, val.idx)} />
                                        <CIcon icon={cilTrash} size="xl" className="pointer" title="remove color" onClick={() => deleteSizeColor(val.id)} />
                                    </div>}
                                </div>
                            )

                            }

                            {colorsAndSizes.colors && !colorsAndSizes.sizes && colorsAndSizes.quantityDetails.map((val, idx) =>
                                <div key={`color${idx}`} className="marginDiv sizesDiv"   >
                                    <h5 className="sizeHead">{val.color}: </h5>
                                    <input type="number" id={val.color} key={`sizeQty${idx}`} placeholder={t('quantity')} onChange={updateColorQuantity} className={`no${i18n.language}`} />
                                </div>
                            )

                            }


                        </div>}

                    </>}
                    <section className="discountSection">
                        <section>

                            <CFormCheck id="discount" label={t('hasDiscount')} onChange={e => setDiscount({ ...discount, hasDiscount: e.target.checked })} />
                            <input type={discount.hasDiscount ? 'number' : 'hidden'} placeholder={t('insertDiscount')} className="discountRate" step="0.01" max="0.99" onChange={e => setDiscount({ ...discount, discountRate: Number(e.target.value) })} />
                        </section>

                        <label>{t('discountLabel')}</label>
                    </section>

                    <hr />
                    <CInputGroup className="mb-3 upload">
                        <section>
                            <CFormInput type="file" id="image" multiple="multiple" onChange={e => console.log(e.target.files[0])} accept="image/png,image/jpeg" />
                        </section>
                        <br />
                        <section>
                            <label>{t('uploadLabel')}</label>

                        </section>
                    </CInputGroup>

                    <label>- * {t('required')}</label>
                </section>
                <CButton type="submit" color="primary">
                    {t('submit')}
                </CButton>
            </form>
        </>

    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = { addProductHandler }
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);