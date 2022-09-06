import * as React from "react"
import { observer } from "mobx-react-lite"
import { CustomLoginButton } from "../custom-login-button/custom-login-button"


export interface CustomSocialButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
}

/**
 * Describe your component here
 */
export const CustomSocialButton = observer(function CustomSocialButton(
  props: CustomSocialButtonProps,
) {
  const { } = props
  const onSignInFacebookPressed = () => {
    console.warn("onSignInFacebookPressed")
  }
  const onSignInGooglePressed = () => {
    console.warn("onSignInGooglePressed")
  }
  return (
    <>
      <CustomLoginButton
        text="Sign In with Facebook"
        onPress={onSignInFacebookPressed}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
      />
      <CustomLoginButton
        text="Sign In with Google"
        onPress={onSignInGooglePressed}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
    </>
  )
})
