/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, FC, useEffect } from 'react';
import { useTranslation, useAppLoaded, Trans } from '@wix/yoshi-flow-bm';
import { Page, Layout, Cell, Card, Text } from 'wix-style-react';
import { Extension, getHostContainer } from '@wix/business-manager-api';

const CONTAINER_DEV_CENTER_COMP_ID = '0cb1ba69-9953-4a1b-b653-ddc671e014e9';

const Index: FC = () => {
  useAppLoaded({ auto: true });

  const [extensions, setExtensions] = useState<Extension<any>[]>();
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    const { getExtensions } = getHostContainer(CONTAINER_DEV_CENTER_COMP_ID);
    getExtensions().then((ext) => {
      setExtensions(ext);
      setLoading(false);
    });
  }, []);

  return (
    <Page>
      <Page.Header dataHook="app-title" title={t('app.title')} />
      <Page.Content>
        <Layout>
          <Cell>
            <Card>
              <Card.Content>
                {loading ? 'Loading...' : ''}
                {extensions?.map((ext) => {
                  return <ext.Component />;
                })}
              </Card.Content>
            </Card>
          </Cell>
        </Layout>
      </Page.Content>
    </Page>
  );
};

export default Index;
