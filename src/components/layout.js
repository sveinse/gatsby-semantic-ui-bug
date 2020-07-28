import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Menu, Responsive, Visibility, Sidebar, Icon } from "semantic-ui-react"

const getWidth = () => {
  const isSSR = typeof window === "undefined"
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Menu fixed={fixed ? "top" : null}>
            <Menu.Item as={Link} activeClassName="active" to="/">
              Home
            </Menu.Item>
            <Menu.Item as={Link} activeClassName="active" to="/page-2">
              Page2
            </Menu.Item>
          </Menu>
        </Visibility>
        {this.props.children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })
  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as={Link} activeClassName="active" to="/">
            Home
          </Menu.Item>
          <Menu.Item as={Link} activeClassName="active" to="/page-2">
            Page2
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Menu>
            <Menu.Item onClick={this.handleToggle}>
              <Icon name="sidebar" size="large" />
            </Menu.Item>
          </Menu>
          {this.props.children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const Layout = ({ children }) => (
  <>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
