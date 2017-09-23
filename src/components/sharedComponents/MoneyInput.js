import VMasker from "vanilla-masker"
import React from "react"
import * as UI from "material-ui"
import { reverseString } from "../../helpers/helpers"

class MaskedTextField extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: props.defaultValue } // set initial value from default value in props
  }

  onChange(mask, e) {
    // this is a hack, to make the mask work properly,
    // you can remove the reverse function and type 20000 
    // in the input to see what i mean 💩😎
    const reversedValue = reverseString(e.target.value)
    const maskedValue = reverseString(VMasker.toPattern(
      reversedValue,
      "999,999,999,999,999,999"
    ))
    this.setState({ value: maskedValue })
    if (this.props.onChange) this.props.onChange(maskedValue, e)
  }

  render() {
    const { mask, ...other } = this.props
    delete other.defaultValue // remove default value from TextField input (see link below)
    other.onChange = this.onChange.bind(this, mask)
    other.value = this.state.value
    return <UI.TextField {...other} />
  }
}

MaskedTextField.propTypes = {
  mask: React.PropTypes.string
}

export default MaskedTextField
