import {
    objectType,
    nonNull,
    stringArg,
    arg
} from 'nexus'
import { TUsrMForeman } from './foremanSchema'

export const QueryEmployee = objectType({
    name: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('allEmp', {
            type: 'TUsrMEmployee',
            args: {
                id: stringArg(),
            },
            resolve: (_parent, args, context) => {
                return context.prisma.tUsrMEmployee.findMany({
                    where: { XVEmpCode: args.id || undefined },
                })
            },
        })
    },
})

export const TUsrMEmployee = objectType({
    name: 'TUsrMEmployee',
    definition(t) {
        t.nonNull.string('XVEmpCode')
        t.string('XVEmpFirstName')
        t.string('XVFrmCode')
        t.field('TUsrMForeman', {
            type: 'TUsrMForeman',
            resolve: (parent, _, context) => {
                return context.prisma.tUsrMEmployee
                    .findUnique({
                        where: { XVEmpCode: parent.XVEmpCode },
                    })
                    .TUsrMForeman()
            },
        })
    },
})

export default {
    QueryEmployee,
    TUsrMEmployee,
}