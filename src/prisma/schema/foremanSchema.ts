import {
    objectType,
} from 'nexus'

export const TUsrMForeman = objectType({
    name: 'TUsrMForeman',
    definition(t) {
        t.nonNull.string('XVFrmCode')
        t.string('XVFrmFirstName')
        t.string('XVFrmLastName')
    },
})

export default {
    TUsrMForeman
}