/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import '../../../testUtilities/matchers'
import { Asset } from '@ironfish/rust-nodejs'
import { Assert } from '../../../assert'
import { createRouteTest } from '../../../testUtilities/routeTest'
import { CurrencyUtils } from '../../../utils'

describe('Route chain.getAsset', () => {
  const routeTest = createRouteTest()

  it('responds with an asset', async () => {
    const asset = await routeTest.node.chain.getAssetById(Asset.nativeIdentifier())
    Assert.isNotNull(asset)

    const response = await routeTest.client.getAsset({
      identifier: asset.identifier.toString('hex'),
    })

    expect(response.content.identifier).toEqual(asset.identifier.toString('hex'))
    expect(response.content.metadata).toBe(asset.metadata.toString('hex'))
    expect(response.content.owner).toBe(asset.owner.toString('hex'))
    expect(response.content.nonce).toBe(asset.nonce)
    expect(response.content.supply).toBe(CurrencyUtils.encode(asset.supply))
    expect(response.content.createdTransactionHash).toBe(
      asset.createdTransactionHash.toString('hex'),
    )
  })
})