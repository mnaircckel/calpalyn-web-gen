# Writes all data into Calpalyn instruction file
# Data: Dictionary representing all form fields
# Lines: A list of lines to write
def write_lines(data):
    # Open file
    with open('file.instrs', 'wb+') as f:
        # Each line represents a line in the Calpalyn instruction file
        for line in lines:
            if line == "01":
                    dataA = data.next().get()[:1]
                    f.write(dataA + ' '*(1-len(dataA)) +  ' ' + '0' + ' ' + data.next().get()[:9])
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')

            elif line == "02":
                    f.write('1')
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')

            elif line == "03":
                    dataA = data.next().get()[:1]
                    dataB = data.next().get()[:1]
                    dataC = data.next().get()[:1]
                    dataD = data.next().get()[:1]
                    dataE = data.next().get()[:1]
                    dataF = data.next().get()[:1]
                    dataG = data.next().get()[:1]
                    dataH = data.next().get()[:1]
                    dataI = data.next().get()[:1] 
                    f.write(dataA + ' '*(1-len(dataA)) + ' ' + dataB + ' '*(1-len(dataB))  + ' ' + dataC + ' '*(1-len(dataC))  + ' ' + dataD + ' '*(1-len(dataD))  + ' ' + dataE + ' '*(1-len(dataE))  + ' ' + dataF + ' '*(1-len(dataF))  + ' ' + dataG + ' '*(1-len(dataG))  + ' ' + dataH + ' '*(1-len(dataH))  + ' ' + dataI)
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')

            elif line in ["04","05","06","07","08","09","10","11","12"]:
                    f.write('1' + ' ' + data.next().get()[:75])
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')

            elif line == "13":
                    f.write(data.next().get()[:1])
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')
                    
            elif line == "15":
                    f.write('1')
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')

            elif line == "14":
                    dataA = data.next().get()[:1]
                    dataB = data.next().get()[:1]
                    dataC = data.next().get()[:1]
                    dataD = data.next().get()[:1]
                    dataE = data.next().get()[:1]
                    f.write(dataA + ' '*(1-len(dataA)) + ' ' + dataB + ' '*(1-len(dataB))  + ' ' + dataC + ' '*(1-len(dataC)) +  ' ' + dataD + ' '*(1-len(dataD)) + ' ' + dataE)
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')

            elif line == "16":
                    f.write(data.next().get()[:1])
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')
                    
            elif line in ["17", "18", "19"]:
                    dataA = data.next().get()[:1]
                    f.write(dataA + ' '*(1-len(dataA)) + ' ' + data.next().get()[:5])
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')

            
            # Line 20 handles lines 20 and 20A
            elif line == "20":
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
                    f.write(" "*81+"//Line "+str(20))                            
                    f.write('\n')

                    # Line 20A
                    f.write(data1A + ' '*(1-len(data1A)) + ' ' + data1B + ' '*(1-len(data1B)) + ' ' + data1C + ' '*(1-len(data1C)) + ' ' + data1D + ' '*(7-len(data1D)) + ' ' + data1E + ' '*(2-len(data1E)) + ' ' + data1F)
                    f.write(" "*81+"//Line 20A")
                    f.write('\n')
                    

            elif line == "21":
                    dataA = data.next().get()[:1]
                    dataB = data.next().get()[:1]
                    dataC = data.next().get()[:1]
                    dataD = data.next().get()[:1]
                    f.write(dataA + ' '*(1-len(dataA)) + ' ' + dataB + ' '*(1-len(dataB)) + ' ' + dataC + ' '*(1-len(dataC))  + ' ' + dataD)
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')

            elif line  == "22":
                    dataA = data.next().get()[:6]
                    dataB = data.next().get()[:6]
                    dataC = data.next().get()[:6]
                    dataD = data.next().get()[:6]
                    dataE = data.next().get()[:6]
                    f.write(' ' + dataA + ' '*(6-len(dataA)) + ' ' + dataB + ' '*(6-len(dataB)) + ' ' + dataC + ' '*(6-len(dataC)) + ' ' + dataD + ' '*(6-len(dataD)) + ' ' + dataE)
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')

            elif line == "23":
                    f.write(data.next().get()[:2])
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')                   

            elif line == "24":
                    f.write(data.next().get()[:40])
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')

            elif line == "25":
                    f.write(data.next().get()[:80])
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')

            elif line == "26":
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
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')

            elif line == "26A":
                    f.write(data.next().get()[:30])
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')

            elif line == "27":
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
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')

            elif line == "28":
                    f.write('0')
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')

            elif line == "29":
                    f.write('1')
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')

            elif line == "30":
                for i in range(entries_number/2):
                    dataB = data.next().get()[:7]
                    dataC = data.next().get()[:1]
                    if (i+1) != (entries_number/2):
                        f.write('0' + ' ' + dataB + ' '*(7-len(dataB)) + ' ' + dataC)
                    else:
                        f.write('1' + ' ' + dataB + ' '*(7-len(dataB)) + ' ' + dataC)
                    f.write(" "*81+"//Line "+str(line))
                    f.write('\n')