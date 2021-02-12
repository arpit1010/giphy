import React from 'react'
interface SearchState {
    searchTerm :string
}
interface SearchProps {
    onChange :any
}
class SearchBar extends React.Component<SearchProps, SearchState> {
  constructor(props: any) {
    super(props)

    this.state = {
      searchTerm: ''
    }
  }

  handleSearchBarChange(searchTerm: string) {
    this.setState({ searchTerm })
    this.props.onChange(searchTerm)
  }

  render() {
    return (
          <div className="mb-10 mt-10">
            <input
              type="text"
              placeholder="Search all the GIFs..."
              value={this.state.searchTerm}
              className="border-b h-10 w-80 pl-5 rounded"
              onChange={(ev) => this.handleSearchBarChange(ev.target.value)}
            />
          </div>
    )
  }
}

export default SearchBar