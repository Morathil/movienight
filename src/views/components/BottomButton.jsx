import React, { Component } from 'react'
import { ButtonBase, Typography } from '@material-ui/core'
import theme from 'src/theme'

class BottomButton extends Component {
  render () {
    const { onAction, disabled, children } = this.props

    return (
      <ButtonBase onClick={onAction} disabled={disabled} style={this.getButtonStyle()}>
        <Typography variant='h6'>
          {children}
        </Typography>
      </ButtonBase>
    )
  }

  getButtonStyle () {
    const { onAction, disabled, children, colorType } = this.props

    const isSecondary = (colorType === 'secondary')
    const opacity = disabled ? 0.6 : 1

    return {
      width: '100%',
      height: '12vh',
      opacity,
      marginTop: '10px',
      backgroundColor: isSecondary ? theme.palette.secondary.main : theme.palette.primary.main,
      // color: isSecondary ? '#ffffff' : theme.palette.text.primary
      // border: isSecondary ? `4px solid ${theme.palette.primary.dark}` : undefined,
      // color: isSecondary ? theme.palette.primary.dark : undefined
    }
  }
}

export default BottomButton
