/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactElement } from 'react'
import { MockedResponse, MockedProvider } from '@apollo/client/testing'
import { render } from '@testing-library/react'

type RenderWithMockedProviderOptions = {
  mocks: MockedResponse[]
  addTypename?: boolean
}

// Reusable function to render a component with MockedProvider
export const renderWithMockedProvider = (
  component: ReactElement,
  options: RenderWithMockedProviderOptions
) => {
  const { mocks, addTypename } = options
  return render(
    <MockedProvider mocks={mocks} addTypename={addTypename}>
      {component}
    </MockedProvider>
  )
}
