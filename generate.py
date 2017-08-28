# Writes all data into Calpalyn instruction file
# Data: Dictionary representing all form fields
# Lines: A list of lines to write
def write_lines(data):
    # Open file
    with open('file.instrs', 'wb+') as f:
        # Each line represents a line in the Calpalyn instruction file

        ''' Line 1 '''
        dataA = '0' # File Type
        dataB = data['line1Box2'] # Vertical Factor
        f.write(dataA + ' '*(1-len(dataA)) +  ' ' + '0' + ' ' + dataB)
        f.write(" "*81+"//Line 01")
        f.write('\n')

        ''' Line 2 '''
        f.write('1')
        f.write(" "*81+"//Line 02")
        f.write('\n')

        ''' Line 3 '''
        dataA = '0'
        dataB = data.next().get()[:1]
        dataC = data.next().get()[:1]
        dataD = data.next().get()[:1]
        dataE = data.next().get()[:1]
        dataF = data.next().get()[:1]
        dataG = data.next().get()[:1]
        dataH = data.next().get()[:1]
        dataI = data.next().get()[:1]
        f.write(dataA + ' '*(1-len(dataA)) + ' ' + dataB + ' '*(1-len(dataB))  + ' ' + dataC + ' '*(1-len(dataC))  + ' ' + dataD + ' '*(1-len(dataD))  + ' ' + dataE + ' '*(1-len(dataE))  + ' ' + dataF + ' '*(1-len(dataF))  + ' ' + dataG + ' '*(1-len(dataG))  + ' ' + dataH + ' '*(1-len(dataH))  + ' ' + dataI)
        f.write(" "*81+"//Line 03")
        f.write('\n')

        ''' Subtotal Lines '''
        for line in ["2", "3", "4", "5", "6", "7", "8"]:
            f.write('1' + ' ' + data['line3Box' + line])
            f.write(" "*81+"//Lines 5-11")
            f.write('\n')

        ''' Line 13 '''
        f.write('1')
        f.write(" "*81+"//Line 13")
        f.write('\n')

        ''' Line 14 '''
        dataA = '1'
        dataB = '0'
        dataC = '0'
        dataD = '0'
        dataE = '1'
        f.write(dataA + ' '*(1-len(dataA)) + ' ' + dataB + ' '*(1-len(dataB))  + ' ' + dataC + ' '*(1-len(dataC)) +  ' ' + dataD + ' '*(1-len(dataD)) + ' ' + dataE)
        f.write(" "*81+"//Line 14")
        f.write('\n')

        ''' Line 15 '''
        f.write('1')
        f.write(" "*81+"//Line 15")
        f.write('\n')

        ''' Line 16 '''
        f.write('1')
        f.write(" "*81+"//Line 16")
        f.write('\n')

        ''' Line 17-19 '''
        for line in ["17", "18", "19"]:
            dataA = ''
            dataB = ''
            f.write(dataA + ' '*(1-len(dataA)) + ' ' + dataB)
            f.write(" "*81+"//Line "+str(line))
            f.write('\n')

        ''' Lines 20, 20A '''
        for i in range(entries_number/12):
            # Line 20 entries
            dataB = data.next().get()[:5]
            dataC = data.next().get()[:1]
            dataD = data.next().get()[:25]
            dataF = data.next().get()[:1]
            dataI = data.next().get()[:6]
            dataJ = data.next().get()[:30]

            # Line 20A entries
            data1A = data.next().get()[:1]
            data1B = data.next().get()[:1]
            data1C = data.next().get()[:1]
            data1D = data.next().get()[:7]
            data1E = data.next().get()[:2]
            data1F = data.next().get()[:1]

            # Line 20
            if (i+1) != (entries_number/12):

                f.write('0' + ' ' + dataB + ' '*(5-len(dataB)) + ' ' + dataC + ' '*(1-len(dataC))  + ' ' + dataD + ' '*(25-len(dataD)) + ' ' + dataF + ' '*(1-len(dataF))  + '      ' + dataI + ' '*(6-len(dataI)) + ' ' + dataJ )
            else:
                f.write('1' + ' ' + dataB + ' '*(5-len(dataB)) + ' ' + dataC + ' '*(1-len(dataC))  + ' ' + dataD + ' '*(25-len(dataD)) + ' ' + dataF + ' '*(1-len(dataF))  + '      ' + dataI + ' '*(6-len(dataI)) + ' ' + dataJ )
            f.write(" "*81+"//Line 20")
            f.write('\n')

            # Line 20A
            f.write(data1A + ' '*(1-len(data1A)) + ' ' + data1B + ' '*(1-len(data1B)) + ' ' + data1C + ' '*(1-len(data1C)) + ' ' + data1D + ' '*(7-len(data1D)) + ' ' + data1E + ' '*(2-len(data1E)) + ' ' + data1F)
            f.write(" "*81+"//Line 20A")
            f.write('\n')


        ''' Line 21 '''
        dataA = data['line21Box1']
        dataB = data['line21Box2']
        dataC = data['line21Box3']
        dataD = data['line21Box4']
        f.write(dataA + ' '*(1-len(dataA)) + ' ' + dataB + ' '*(1-len(dataB)) + ' ' + dataC + ' '*(1-len(dataC))  + ' ' + dataD)
        f.write(" "*81+"//Line 21")
        f.write('\n')

        ''' Line 22 '''
        dataA = data['line22Box1']
        dataB = data['line22Box2']
        dataC = data['line22Box3']
        dataD = data['line22Box4']
        dataE = ''
        f.write(' ' + dataA + ' '*(6-len(dataA)) + ' ' + dataB + ' '*(6-len(dataB)) + ' ' + dataC + ' '*(6-len(dataC)) + ' ' + dataD + ' '*(6-len(dataD)) + ' ' + dataE)
        f.write(" "*81+"//Line 22")
        f.write('\n')

        ''' Line 23 '''
        dataA = data['line23Box1']
        f.write(dataA)
        f.write(" "*81+"//Line 23")
        f.write('\n')

        ''' Line 24 '''
        f.write(data['line24'])
        f.write(" "*81+"//Line 24")
        f.write('\n')

        ''' Line 25 '''
        f.write(data['line25'])
        f.write(" "*81+"//Line 25")
        f.write('\n')

        ''' Lines 26 '''
        for i in range(entries_number/5):
            dataB = data.next().get()[:7]
            dataC = data.next().get()[:7]
            dataD = data.next().get()[:7]
            dataE = data.next().get()[:7]
            dataF = data.next().get()[:8]
            if (i+1) != (entries_number/5):
                f.write('0' + ' ' + dataB + ' '*(7-len(dataB)) + ' ' + dataC + ' '*(7-len(dataC)) + ' ' + dataD + ' '*(7-len(dataD)) + ' ' + dataE + ' '*(7-len(dataE)) + ' ' + dataF)
            else:
                f.write('1' + ' ' + dataB + ' '*(7-len(dataB)) + ' ' + dataC + ' '*(7-len(dataC)) + ' ' + dataD + ' '*(7-len(dataD)) + ' ' + dataE + ' '*(7-len(dataE)) + ' ' + dataF)
            f.write(" "*81+"//Line 26")
            f.write('\n')

        ''' Line 26A '''
        f.write(data['line26A'])
        f.write(" "*81+"//Line 26A")
        f.write('\n')

        ''' Lines 27 '''
        for i in range(entries_number/4):
            dataB = data.next().get()[:7]
            dataC = data.next().get()[:1]
            dataD = data.next().get()[:7]
            dataE = data.next().get()
            num_dataE = int(math.ceil(len(dataE)/12.0))
            if (i+1) != (entries_number/4):
                f.write('0' + ' ' + dataB + ' '*(7-len(dataB)) + ' ' + dataC + ' '*(1-len(dataC))  + ' ' + dataD + ' '*(7-len(dataD)) + ' '*17)
            else:
                f.write('1' + ' ' + dataB + ' '*(7-len(dataB)) + ' ' + dataC + ' '*(1-len(dataC))  + ' ' + dataD + ' '*(7-len(dataD)) + ' '*17)
            for i in range(num_dataE):
                f.write(dataE[0+i*12:12+i*12] + ' ')
            f.write(" "*81+"//Line 27")
            f.write('\n')

        ''' Line 28 '''
        f.write('0')
        f.write(" "*81+"//Line 28")
        f.write('\n')

        ''' Line 29 '''
        f.write('1')
        f.write(" "*81+"//Line 29")
        f.write('\n')

        ''' Lines 30 '''
        for i in range(entries_number/2):
            dataB = data.next().get()[:7]
            dataC = data.next().get()[:1]
            if (i+1) != (entries_number/2):
                f.write('0' + ' ' + dataB + ' '*(7-len(dataB)) + ' ' + dataC)
            else:
                f.write('1' + ' ' + dataB + ' '*(7-len(dataB)) + ' ' + dataC)
            f.write(" "*81+"//Line 30")
            f.write('\n')
