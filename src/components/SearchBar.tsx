import { Input, InputProps } from 'antd'

const SearchBar = (props: InputProps) => {
  const { onChange } = props
  return (
    <Input data-testid="search-bar" {...props} allowClear onChange={onChange} />
  )
}

export default SearchBar
