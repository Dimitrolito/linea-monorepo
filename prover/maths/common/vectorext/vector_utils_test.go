// Copyright 2020-2024 Consensys Software Inc.
// Licensed under the Apache License, Version 2.0. See the LICENSE file for details.

// Code generated by consensys/gnark-crypto DO NOT EDIT

package vectorext

import (
	"bytes"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"reflect"
	"testing"
)

const fuzzIteration = 20

func TestVectorRoundTrip(t *testing.T) {
	for it := 0; it < fuzzIteration; it++ {

		v := make(Vector, 10)
		for i := 0; i < 10; i++ {
			v[i].SetRandom()
		}

		b, err := v.MarshalBinary()
		assert.NoError(t, err)

		var w1, w2 Vector

		err = w1.UnmarshalBinary(b)
		assert.NoError(t, err)

		err = w2.unmarshalBinaryAsync(b)
		assert.NoError(t, err)

		assert.True(t, reflect.DeepEqual(v, w1))
		assert.True(t, reflect.DeepEqual(v, w2))
	}

}

func TestVectorEmptyRoundTrip(t *testing.T) {
	assert := require.New(t)

	v1 := make(Vector, 0)

	b, err := v1.MarshalBinary()
	assert.NoError(err)

	var v2, v3 Vector

	err = v2.UnmarshalBinary(b)
	assert.NoError(err)

	err = v3.unmarshalBinaryAsync(b)
	assert.NoError(err)

	assert.True(reflect.DeepEqual(v1, v2))
	assert.True(reflect.DeepEqual(v3, v2))
}

func (vector *Vector) unmarshalBinaryAsync(data []byte) error {
	r := bytes.NewReader(data)
	_, err, chErr := vector.AsyncReadFrom(r)
	if err != nil {
		return err
	}
	return <-chErr
}
