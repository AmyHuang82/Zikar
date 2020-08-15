import React from 'react';
import set from 'lodash/set';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
`;

const Block = styled.div`
  display: flex;
  padding: 15px 0;
  width: 100px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  :hover {
    background: gainsboro;
  }
`;

const req = require.context('./', true, /.js$/);
const icons = req.keys().filter((key) => key.indexOf('.story.js') === -1);
const iconMenu = icons.reduce((menuObj, icon) => {
  const path = icon.replace(/^\.\/(.+?)\.js/, '$1').split('/');
  return set(menuObj, path, icon);
}, {});

export default {
  title: 'Icons',
};

export function List() {
  return (
    <Container>
      {Object.entries(iconMenu).map(([name, value]) => {
        const Icon = req(value).default;
        return (
          <Block key={name}>
            <Icon />
            {name}
          </Block>
        );
      })}
    </Container>
  );
}
