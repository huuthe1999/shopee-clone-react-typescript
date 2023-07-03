import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { Play } from 'react-feather'
import { UseControllerProps, useController, useForm, useFormContext } from 'react-hook-form'

import { DropdownMenu, FormInput } from '@/components'
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/contexts'
import { useBoolean, useDistrictsQuery, useProvincesQuery, useWardsQuery } from '@/hooks'

import { ContentTab, TabButton } from './TabButton'
import { TAddressField, TAddressForm, addressField } from './validate'

interface Props {
  className?: string
  label: string
  disabled?: boolean
}

const AddressFormInput = ({
  label,
  disabled = false,
  ...rest
}: Omit<Props, 'className'> & UseControllerProps<TAddressForm>) => {
  const [isFocus, setIsFocus] = useState(false)
  const {
    field,
    fieldState: { error, invalid }
  } = useController(rest)

  return (
    <>
      <FormInput
        label={label}
        {...field}
        value={field.value.toString()}
        disabled={disabled}
        onFocus={() => {
          setIsFocus(true)
        }}
        onBlur={() => {
          field.onBlur()
          setIsFocus(false)
        }}
        invalid={invalid}
        isShowError={!isFocus}
        errorMessage={error?.message}
      />
    </>
  )
}

export const AddressFormSelect = ({
  className,
  label,
  province,
  ward,
  district
}: Props & Partial<TAddressField>) => {
  const [activeTab, setActiveTab] = useState<keyof TAddressField>('province')
  const { value: open, toggle, setTrue, setFalse } = useBoolean()
  const [isFocus, setIsFocus] = useState(false)

  const {
    getValues: getAddressFieldValues,
    setValue: setValueAddressField,
    formState: { dirtyFields, isValid, errors, isDirty },
    getFieldState: getAddressFieldState,
    trigger: triggerAddressField,
    setFocus
  } = useForm<TAddressField>({
    defaultValues: addressField.getDefault(),
    resolver: yupResolver(addressField),
    mode: 'onBlur'
  })

  const {
    setValue: setValueAddressForm,
    getFieldState,
    reset: resetAddressForm
  } = useFormContext<TAddressForm>()

  const { error: fillAddressError, invalid: fillAddressInvalid } = getFieldState('fillAddress')
  const { error: errorActiveTab } = getAddressFieldState(activeTab)

  const provinceValue = getAddressFieldValues('province')
  const districtValue = getAddressFieldValues('district')
  const wardValue = getAddressFieldValues('ward')

  const { data: provincesQueryData, isFetching: isFetchingProvinces } = useProvincesQuery()
  const { data: districtsQueryData, isFetching: isFetchingDistricts } =
    useDistrictsQuery(provinceValue)
  const { data: wardsQueryData, isFetching: isFetchingWards } = useWardsQuery(districtValue)

  const provincesData = provincesQueryData?.data.data
  const districtsData = districtsQueryData?.data.data
  const wardsData = wardsQueryData?.data.data

  const provinceSelected = provincesData?.find((province) => province._id === provinceValue)

  const districtSelected = districtsData?.find((district) => district._id === districtValue)

  const wardSelected = wardsData?.find((ward) => ward._id === wardValue)

  const value = (provinceSelected?.name ?? '')
    .concat(districtSelected?.name ? `, ${districtSelected?.name}` : '')
    .concat(wardSelected?.name ? `, ${wardSelected?.name}` : '')

  const handleSetValue = (id: string) => {
    setValueAddressField(activeTab, id, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  useEffect(() => {
    if (province && district && ward) {
      setValueAddressField('province', province, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
      setValueAddressField('district', district, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
      setValueAddressField('ward', ward, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
      setValueAddressForm('fillAddress', true, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [setValueAddressField, setValueAddressForm, province, district, ward])

  useEffect(() => {
    if (isValid && provinceSelected && districtSelected && wardSelected) {
      setValueAddressForm('province', provinceSelected, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
      setValueAddressForm('district', districtSelected, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
      setValueAddressForm('ward', wardSelected, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
      setValueAddressForm('fillAddress', true, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [isValid, setValueAddressForm, provinceSelected, districtSelected, wardSelected])

  return (
    <>
      <div className={classNames('flex w-full flex-col', [className])}>
        <TooltipProvider
          placement="bottom"
          noArrowRef
          mainAxis={0}
          matchRefWidth
          click
          open={open}
          onOpenChange={(openValue) => {
            toggle()
            if (!openValue && !isFocus) {
              triggerAddressField()
            }
          }}>
          <TooltipTrigger asChild onClick={setTrue}>
            <div>
              <div className="relative z-0 mb-1 w-full">
                <input
                  value={value}
                  onFocus={() => {
                    setIsFocus(true)
                  }}
                  onBlur={() => {
                    setIsFocus(false)
                  }}
                  readOnly
                  id={activeTab}
                  className={classNames(
                    'peer/label block w-full appearance-none rounded-sm border p-2 text-sm text-gray-900 focus:border-black/[0.54] focus:bg-transparent focus:outline-none focus:ring-0',
                    {
                      'border-red-600 bg-red-50':
                        !open && (fillAddressInvalid || (isDirty && !isValid)),
                      'border-gray-300 bg-transparent': isValid
                    }
                  )}
                  placeholder=" "
                  autoComplete="off"
                />
                <Play
                  className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 fill-gray-400 text-gray-400 transition-transform peer-focus/label:-rotate-90"
                  size={10}
                />
                <label
                  htmlFor={activeTab}
                  className={classNames(
                    'absolute left-3 top-1/2 z-10 origin-[0] -translate-y-[1.8rem] scale-75 transform bg-white px-1 text-sm duration-100 peer-placeholder-shown/label:-translate-y-1/2 peer-placeholder-shown/label:scale-100 peer-placeholder-shown/label:bg-transparent peer-focus/label:-translate-y-[1.8rem] peer-focus/label:scale-75 peer-focus/label:bg-white peer-focus/label:text-inherit',
                    {
                      'bg-white text-red-500':
                        !open && (fillAddressInvalid || (isDirty && !isValid)),
                      'text-inherit': isValid
                    }
                  )}>
                  {label}
                </label>
              </div>

              <AnimatePresence>
                {(errorActiveTab?.message ||
                  Object.values(errors)?.[0] ||
                  fillAddressError?.message) && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: '1.25rem' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: 'tween', duration: 0.1 }}
                    className="text-xs text-red-500">
                    {errorActiveTab?.message ||
                      Object.values(errors)?.[0]?.message ||
                      fillAddressError?.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </TooltipTrigger>
          <TooltipContent className="z-[10000]">
            <div className="w-full rounded-sm border border-gray-300 bg-white">
              <div className="h-full text-center text-sm font-medium text-gray-500">
                <ul className="flex flex-wrap border-b border-gray-200">
                  <TabButton
                    label="Tỉnh/ Thành phố"
                    isActive={activeTab === 'province'}
                    onClick={() => {
                      setActiveTab('province')
                      setFocus('province')
                    }}
                  />
                  <TabButton
                    label="Quận/Huyện"
                    disabled={!dirtyFields.province}
                    isActive={activeTab === 'district'}
                    onClick={() => {
                      setActiveTab('district')
                      setFocus('district')
                    }}
                  />
                  <TabButton
                    label="Phường/Xã"
                    disabled={!dirtyFields.province || !dirtyFields.district}
                    isActive={activeTab === 'ward'}
                    onClick={() => {
                      setActiveTab('ward')
                      setFocus('ward')
                    }}
                  />
                </ul>
                <DropdownMenu className="h-[13.5rem] border-none">
                  {activeTab === 'province' && (
                    <ContentTab
                      data={provincesData}
                      isLoading={isFetchingProvinces}
                      itemActive={provinceValue}
                      onClick={(id) => {
                        if (provinceValue && provinceValue !== id) {
                          resetAddressForm(
                            {
                              fillAddress: false
                            },
                            {
                              keepDirtyValues: true,
                              keepErrors: true
                            }
                          )
                          setValueAddressField('district', '', {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true
                          })
                          setValueAddressField('ward', '', {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true
                          })
                        }
                        setFocus('district')
                        handleSetValue(id)
                        setActiveTab('district')
                      }}
                    />
                  )}
                  {activeTab === 'district' && (
                    <ContentTab
                      data={districtsData}
                      isLoading={isFetchingDistricts}
                      itemActive={districtValue}
                      onClick={(id) => {
                        if (districtValue && districtValue !== id) {
                          resetAddressForm(
                            {
                              fillAddress: false
                            },
                            {
                              keepDirty: true,
                              keepDefaultValues: true,
                              keepErrors: true,
                              keepDirtyValues: true
                            }
                          )
                          setValueAddressForm('fillAddress', false, {
                            shouldDirty: true,
                            shouldValidate: true
                          })
                          setValueAddressField('ward', '', {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true
                          })
                        }
                        setFocus('ward')
                        setActiveTab('ward')
                        handleSetValue(id)
                      }}
                    />
                  )}
                  {activeTab === 'ward' && (
                    <ContentTab
                      data={wardsData}
                      isLoading={isFetchingWards}
                      itemActive={wardValue}
                      onClick={(id) => {
                        handleSetValue(id)
                        setActiveTab('province')
                        setFalse()
                        setValueAddressForm('fillAddress', true, {
                          shouldDirty: true,
                          shouldValidate: true,
                          shouldTouch: true
                        })
                      }}
                    />
                  )}
                </DropdownMenu>
              </div>
            </div>
          </TooltipContent>
        </TooltipProvider>
      </div>
    </>
  )
}

export default AddressFormInput
